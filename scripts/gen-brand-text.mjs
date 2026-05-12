import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "newtext.jpeg";
const OUT = "public/brand-text.png";

// Tight crop around the text region in newtext.jpeg (left=30, top=380, w=470, h=500)
const CROP = { left: 30, top: 380, width: 470, height: 500 };

// Pixel classification thresholds
const isBlack = (r, g, b) => r < 55 && g < 55 && b < 55;
const isRed = (r, g, b) => r > 130 && g < 80 && b < 80 && r > g * 1.8 && r > b * 1.8;

// Drop connected components smaller than this — removes tiny background noise blobs
const MIN_COMPONENT_PX = 300;

// Pixels within this radius of a text pixel are kept (preserves white halo)
const HALO_RADIUS = 4;

const { data, info } = await sharp(SRC).extract(CROP).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const N = W * H;

const isText = new Uint8Array(N);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * C;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (isBlack(r, g, b) || isRed(r, g, b)) isText[y * W + x] = 1;
  }
}

// Connected-component labeling (4-connectivity, iterative DFS) to drop small blobs
const label = new Int32Array(N);
const stack = new Int32Array(N);
let nextLabel = 1;
const sizes = [0];
const members = [null];
for (let s = 0; s < N; s++) {
  if (!isText[s] || label[s]) continue;
  let top = 0;
  stack[top++] = s;
  label[s] = nextLabel;
  const mem = [s];
  while (top > 0) {
    const p = stack[--top];
    const x = p % W, y = (p - x) / W;
    const neigh = [];
    if (x > 0) neigh.push(p - 1);
    if (x < W - 1) neigh.push(p + 1);
    if (y > 0) neigh.push(p - W);
    if (y < H - 1) neigh.push(p + W);
    for (const q of neigh) {
      if (isText[q] && !label[q]) {
        label[q] = nextLabel;
        stack[top++] = q;
        mem.push(q);
      }
    }
  }
  sizes.push(mem.length);
  members.push(mem);
  nextLabel++;
}

const keepTextCore = new Uint8Array(N);
for (let lbl = 1; lbl < members.length; lbl++) {
  if (sizes[lbl] >= MIN_COMPONENT_PX) {
    for (const p of members[lbl]) keepTextCore[p] = 1;
  }
}

// Dilate the kept text by HALO_RADIUS to include the white halo around letters
const alpha = new Uint8Array(N);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (!keepTextCore[y * W + x]) continue;
    const x0 = Math.max(0, x - HALO_RADIUS);
    const x1 = Math.min(W - 1, x + HALO_RADIUS);
    const y0 = Math.max(0, y - HALO_RADIUS);
    const y1 = Math.min(H - 1, y + HALO_RADIUS);
    for (let yy = y0; yy <= y1; yy++) {
      for (let xx = x0; xx <= x1; xx++) {
        const dx = xx - x, dy = yy - y;
        if (dx * dx + dy * dy <= HALO_RADIUS * HALO_RADIUS) alpha[yy * W + xx] = 255;
      }
    }
  }
}

// Build RGBA buffer: keep original RGB, set alpha from mask
const rgba = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  const si = i * C;
  rgba[i * 4 + 0] = data[si];
  rgba[i * 4 + 1] = data[si + 1];
  rgba[i * 4 + 2] = data[si + 2];
  rgba[i * 4 + 3] = alpha[i];
}

const png = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .trim()
  .png()
  .toBuffer();

await writeFile(OUT, png);
const out = await sharp(png).metadata();
console.log(`wrote ${OUT}: ${out.width} x ${out.height} (${png.length} bytes)`);
