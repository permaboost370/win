// Generate rounded-corner favicon + apple-touch-icon from public/logowin.jpg.
// Run with: node scripts/round-icons.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const src = resolve(root, "public/logowin.jpg");

async function makeRounded(size, radiusRatio, outPath) {
  const radius = Math.round(size * radiusRatio);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
     </svg>`
  );
  const img = await sharp(readFileSync(src))
    .resize(size, size, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp(img).toFile(outPath);
  console.log(`wrote ${outPath} (${size}px, r=${radius}px)`);
}

// Browser favicon — 512px master, ~22% corner radius (iOS-style)
await makeRounded(512, 0.22, resolve(root, "app/icon.png"));
// Apple touch icon — 180px, same radius (iOS will leave pre-rounded icons alone on modern versions)
await makeRounded(180, 0.22, resolve(root, "app/apple-icon.png"));
