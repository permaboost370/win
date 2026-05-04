import { NextRequest, after } from "next/server";
import { fal } from "@fal-ai/client";
import sharp from "sharp";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const TG_API = "https://api.telegram.org";
const PROMPT_OWNER_TTL = 10 * 60;

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const BOT_USERNAME = (process.env.TELEGRAM_BOT_USERNAME || "win_pfp_bot").toLowerCase();

const PROMPT =
  "Edit the first image (the user's photo) by adding TWO elements while keeping every other pixel of the first image identical. " +
  "ELEMENT 1 — HAIR. Fully replace whatever hair is currently on the head with the hair from the SECOND reference image. Copy it exactly. " +
  "COLOR: warm golden honey-blonde with subtle darker amber shadows — the muted natural yellow-gold tone shown in the second image. NOT neon yellow, NOT pure lemon, NOT cartoon-bright yellow, NOT Super Saiyan, NOT bleach-blonde, NOT pale yellow. The yellow is warm and golden, like honey or dark gold, with brown-amber shading in the deeper strokes. " +
  "SHAPE: a thick voluminous puffy front swoosh that lifts up off the forehead and flows across the head from one side to the other in a wave, with feathered flips/wings at the temples that curl outward. The hair is high and full on top, with the front section combed forward and swept sideways. Match the silhouette, partline, length, and brush strokes of the second image precisely. " +
  "Do NOT recolor or blend with the original hair — fully replace those pixels with the blonde hair from the second image. " +
  "ELEMENT 2 — SUNGLASSES. Place sunglasses flat over the eye area, copying the THIRD reference image exactly: black wayfarer-style frames, thick rims, opaque dark lenses, with the frame shape, lens shape, thickness, and proportions of the third image. The opaque lenses fully cover the eyes underneath while the surrounding face stays untouched. " +
  "PRESERVE from the first image, untouched: the face, every facial feature, skin, skin tone, expression, head shape, ears, jaw, chin, neck, body, pose, clothing, accessories, props, background, lighting, composition, framing, and aspect ratio. The user's identity must remain perfectly recognizable. " +
  "Render the new hair and sunglasses in the SAME art style and medium as the first image (photo → photoreal, cartoon → cartoon, anime → anime, pixel → pixel, 3D → 3D), matching the first image's linework, palette, shading, and brushwork. " +
  "The second and third reference images are isolated element crops on white — use them ONLY as shape/color/style references; ignore any stray skin or edge fragments. Do NOT output Donald Trump. Do NOT replace the user's face.";

type TgMessage = {
  message_id: number;
  chat: { id: number; type: string };
  from?: { id: number; is_bot?: boolean; username?: string };
  text?: string;
  photo?: Array<{ file_id: string; width: number; height: number }>;
  document?: { file_id: string; mime_type?: string };
  reply_to_message?: TgMessage;
};

async function tg(method: string, body: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const r = await fetch(`${TG_API}/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

async function getTgFileUrl(fileId: string): Promise<string> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const r = await fetch(`${TG_API}/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`);
  const data = await r.json();
  if (!data.ok) throw new Error(`getFile failed: ${JSON.stringify(data)}`);
  return `${TG_API}/file/bot${token}/${data.result.file_path}`;
}

async function tgSendPhotoBuffer(
  chatId: number,
  photo: Buffer,
  caption?: string,
  replyTo?: number,
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const form = new FormData();
  form.append("chat_id", String(chatId));
  if (caption) form.append("caption", caption);
  if (replyTo) form.append("reply_to_message_id", String(replyTo));
  form.append("photo", new Blob([new Uint8Array(photo)], { type: "image/jpeg" }), "win-pfp.jpg");
  const r = await fetch(`${TG_API}/bot${token}/sendPhoto`, { method: "POST", body: form });
  return r.json();
}

async function brandImage(imageUrl: string, brandUrl: string): Promise<Buffer> {
  const [imgRes, brandRes] = await Promise.all([fetch(imageUrl), fetch(brandUrl)]);
  if (!imgRes.ok) throw new Error(`fetch result image failed: ${imgRes.status}`);
  if (!brandRes.ok) throw new Error(`fetch brand image failed: ${brandRes.status}`);
  const imgBuf = Buffer.from(await imgRes.arrayBuffer());
  const brandBuf = Buffer.from(await brandRes.arrayBuffer());

  const meta = await sharp(imgBuf).metadata();
  const width = meta.width ?? 1024;
  const height = meta.height ?? 1024;

  const overlayWidth = Math.round(width * 0.28);
  const overlay = await sharp(brandBuf).resize({ width: overlayWidth }).png().toBuffer();
  const overlayMeta = await sharp(overlay).metadata();

  const margin = Math.round(width * 0.04);
  const top = height - (overlayMeta.height ?? 0) - margin;

  return sharp(imgBuf)
    .composite([{ input: overlay, left: margin, top }])
    .jpeg({ quality: 92 })
    .toBuffer();
}

async function rememberPromptOwner(chatId: number, msgId: number, userId: number) {
  if (!REDIS_URL || !REDIS_TOKEN) return;
  try {
    const key = `pfp_owner:${chatId}:${msgId}`;
    await fetch(`${REDIS_URL}/setex/${encodeURIComponent(key)}/${PROMPT_OWNER_TTL}/${userId}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    });
  } catch {}
}

async function getPromptOwner(chatId: number, msgId: number): Promise<{ tracked: boolean; owner: string | null }> {
  if (!REDIS_URL || !REDIS_TOKEN) return { tracked: false, owner: null };
  try {
    const key = `pfp_owner:${chatId}:${msgId}`;
    const r = await fetch(`${REDIS_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    });
    const { result } = await r.json();
    return { tracked: true, owner: result ?? null };
  } catch {
    return { tracked: false, owner: null };
  }
}

async function generate(
  userImageDataUrl: string,
  hairUrl: string,
  sunglassesUrl: string,
): Promise<string | undefined> {
  fal.config({ credentials: process.env.FAL_KEY });
  const result = await fal.subscribe("fal-ai/bytedance/seedream/v4/edit", {
    input: {
      image_urls: [userImageDataUrl, hairUrl, sunglassesUrl],
      prompt: PROMPT,
      image_size: "auto",
      num_images: 1,
      enhance_prompt_mode: "fast",
    },
    logs: false,
  });
  return (result as { data?: { images?: Array<{ url: string }> } })?.data?.images?.[0]?.url;
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (expectedSecret) {
    const got = req.headers.get("x-telegram-bot-api-secret-token");
    if (got !== expectedSecret) return new Response("unauthorized", { status: 401 });
  }

  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.FAL_KEY) {
    return Response.json({ ok: true });
  }

  let update: { message?: TgMessage; edited_message?: TgMessage };
  try {
    update = await req.json();
  } catch {
    return Response.json({ ok: true });
  }

  const message = update.message;
  if (!message) return Response.json({ ok: true });

  const chatId = message.chat.id;
  const userId = message.from?.id;
  const text = message.text || "";
  const photo = message.photo;
  const chatType = message.chat.type;
  const isGroup = chatType === "group" || chatType === "supergroup";
  const replyTo = message.reply_to_message;
  const isReplyToOurBot = !!(
    replyTo &&
    replyTo.from &&
    replyTo.from.is_bot &&
    replyTo.from.username &&
    replyTo.from.username.toLowerCase() === BOT_USERNAME
  );
  const replyOpts: Record<string, unknown> = isGroup ? { reply_to_message_id: message.message_id } : {};

  const cmdMatch = text.match(/^\/(\w+)(?:@(\w+))?(?:\s|$)/);
  const command = cmdMatch?.[1]?.toLowerCase();
  const cmdAt = cmdMatch?.[2]?.toLowerCase();
  if (cmdAt && cmdAt !== BOT_USERNAME) {
    return Response.json({ ok: true });
  }

  const origin = new URL(req.url).origin;
  const hairUrl = process.env.HAIR_IMAGE_URL || `${origin}/hair-ref.jpg`;
  const sunglassesUrl = process.env.SUNGLASSES_IMAGE_URL || `${origin}/sunglasses-ref.jpg`;
  const brandUrl = process.env.BRAND_TEXT_URL || `${origin}/brand-text.png`;

  try {
    if (command === "start") {
      await tg("sendMessage", {
        chat_id: chatId,
        text:
          "*WIN PFP Bot*\n\nSend me a photo (or use /pfp in a group) and I'll turn it into a winner.",
        parse_mode: "Markdown",
        ...replyOpts,
      });
    } else if (command === "help") {
      await tg("sendMessage", {
        chat_id: chatId,
        text: "DM: send a photo. Group: use /pfp then reply to my message with your photo.",
        ...replyOpts,
      });
    } else if (command === "pfp") {
      const r = await tg("sendMessage", {
        chat_id: chatId,
        text: "Reply to this message with your photo (as a photo, not a file) to get your WIN pfp.",
        ...replyOpts,
      });
      const promptId = r?.result?.message_id;
      if (promptId && userId) {
        await rememberPromptOwner(chatId, promptId, userId);
      }
    } else if (photo && photo.length) {
      if (isGroup) {
        if (!isReplyToOurBot || !replyTo) return Response.json({ ok: true });
        const { tracked, owner } = await getPromptOwner(chatId, replyTo.message_id);
        if (tracked) {
          if (!owner) return Response.json({ ok: true });
          if (String(owner) !== String(userId)) {
            await tg("sendMessage", {
              chat_id: chatId,
              text: "This prompt is taken — use /pfp to start your own.",
              ...replyOpts,
            });
            return Response.json({ ok: true });
          }
        }
      }

      const photoArr = photo;
      after(async () => {
        try {
          await tg("sendChatAction", { chat_id: chatId, action: "upload_photo" });
          const statusRes = await tg("sendMessage", {
            chat_id: chatId,
            text: "Cooking your WIN pfp… (15–30s)",
            ...replyOpts,
          });
          const statusId = statusRes?.result?.message_id;

          const largest = photoArr[photoArr.length - 1];
          const fileUrl = await getTgFileUrl(largest.file_id);
          const imgRes = await fetch(fileUrl);
          const buf = Buffer.from(await imgRes.arrayBuffer());
          const mime = imgRes.headers.get("content-type") || "image/jpeg";
          const dataUrl = `data:${mime};base64,${buf.toString("base64")}`;

          const resultUrl = await generate(dataUrl, hairUrl, sunglassesUrl);
          if (!resultUrl) throw new Error("Generation returned no image");

          let sent = false;
          try {
            const branded = await brandImage(resultUrl, brandUrl);
            await tgSendPhotoBuffer(
              chatId,
              branded,
              "WIN.",
              isGroup ? message.message_id : undefined,
            );
            sent = true;
          } catch (brandErr) {
            console.error("brand composite failed, falling back to raw url", brandErr);
          }
          if (!sent) {
            await tg("sendPhoto", {
              chat_id: chatId,
              photo: resultUrl,
              caption: "WIN.",
              ...replyOpts,
            });
          }

          if (statusId) {
            await tg("deleteMessage", { chat_id: chatId, message_id: statusId });
          }
        } catch (err) {
          console.error("pfp gen background error", err);
          try {
            await tg("sendMessage", {
              chat_id: chatId,
              text: "Generation failed. Try again in a moment.",
              ...replyOpts,
            });
          } catch {}
        }
      });
    } else if (message.document && !isGroup) {
      await tg("sendMessage", {
        chat_id: chatId,
        text: "Send the image as a *photo*, not a file. Tap the paperclip → Photo.",
        parse_mode: "Markdown",
      });
    } else if (!isGroup) {
      await tg("sendMessage", {
        chat_id: chatId,
        text: "Send me a photo and I'll turn it into a winner.",
      });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("telegram handler error", err);
    try {
      await tg("sendMessage", {
        chat_id: chatId,
        text: "Generation failed. Try again in a moment.",
        ...replyOpts,
      });
    } catch {}
    return Response.json({ ok: true });
  }
}

export async function GET() {
  return Response.json({ ok: true, bot: BOT_USERNAME });
}
