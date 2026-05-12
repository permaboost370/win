import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const ROWS = [
  { text: "CANT STOP,", color: "#0a0a0a" },
  { text: "WONT STOP", color: "#0a0a0a" },
  { text: "GAMESTOP", color: "#c8161a" },
  { text: "#WINNING", color: "#c8161a" },
];

const FONT_SIZE = 200;
const STROKE = 14;
const ROW_GAP = 12;
const CANVAS_PAD = 20;

async function renderRow({ text, color }) {
  const w = 2400;
  const h = Math.round(FONT_SIZE * 1.35);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <text x="${STROKE}" y="${FONT_SIZE}" fill="${color}" stroke="#ffffff" stroke-width="${STROKE}" paint-order="stroke fill" font-family="Impact, 'Anton', 'Arial Black', 'Helvetica Neue', sans-serif" font-weight="900" font-size="${FONT_SIZE}" letter-spacing="-2">${text}</text>
</svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  const trimmed = await sharp(buf).trim().toBuffer();
  const meta = await sharp(trimmed).metadata();
  return { buf: trimmed, width: meta.width ?? 0, height: meta.height ?? 0 };
}

const rendered = await Promise.all(ROWS.map(renderRow));
const maxW = Math.max(...rendered.map((r) => r.width));
const totalH = rendered.reduce((s, r) => s + r.height, 0) + ROW_GAP * (rendered.length - 1);

const canvasW = maxW + CANVAS_PAD * 2;
const canvasH = totalH + CANVAS_PAD * 2;

const composites = [];
let y = CANVAS_PAD;
for (const r of rendered) {
  composites.push({ input: r.buf, left: CANVAS_PAD, top: y });
  y += r.height + ROW_GAP;
}

const png = await sharp({
  create: {
    width: canvasW,
    height: canvasH,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(composites)
  .png()
  .toBuffer();

await writeFile("public/brand-text.png", png);
console.log("wrote public/brand-text.png", canvasW, "x", canvasH, png.length, "bytes");
