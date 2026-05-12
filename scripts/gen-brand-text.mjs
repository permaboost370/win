import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "newtext.jpeg";
const OUT = "public/brand-text.png";

// Tight crop around the text region in newtext.jpeg.
// Text in source spans roughly x=38..490, y=402..907 — crop with generous
// vertical margin so the dilated halo has room to grow on both ends.
const CROP = { left: 33, top: 388, width: 462, height: 540 };

// After connected-component filtering, force alpha=0 outside this y-band
// (in cropped coords) so any noise components that survived in the buffer
// rows above/below the text get nuked. Text occupies cropped y≈14..519.
const KEEP_Y_MIN = 4;
const KEEP_Y_MAX = 525;

// Pixel classification thresholds
const isBlack = (r, g, b) => r < 55 && g < 55 && b < 55;
const isRed = (r, g, b) => r > 130 && g < 80 && b < 80 && r > g * 1.8 && r > b * 1.8;

// Morphological opening kernel radius (in pixels). Erodes then dilates — removes
// any text-colored noise feature thinner than 2*radius+1 px in any direction
// while keeping the thick (~12-18px) text strokes intact.
const OPEN_RADIUS = 1;

// Drop connected components smaller than this after opening.
// Smallest legit text glyph is ~2280 px (the "I" in WINNING); largest noise
// blob that survives opening is ~420 px — 800 is a safe cutoff.
const MIN_COMPONENT_PX = 800;

// Search radius around each text-core pixel for halo pixels. A larger value
// catches the generous bottom halo without filling the inter-word gaps,
// because we only mark pixels opaque in this region when they are actually
// near-white in the source — the dark cityscape pixels stay transparent.
const HALO_SEARCH_RADIUS = 12;

// "Near-white" threshold used to identify real halo pixels in the source.
const isHalo = (r, g, b) => r > 200 && g > 200 && b > 200;

const { data, info } = await sharp(SRC).extract(CROP).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const N = W * H;

function erode(src, radius) {
  // Horizontal pass
  const tmp = new Uint8Array(N);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let ok = 1;
      for (let dx = -radius; dx <= radius && ok; dx++) {
        const xx = x + dx;
        if (xx < 0 || xx >= W || !src[y * W + xx]) ok = 0;
      }
      tmp[y * W + x] = ok;
    }
  }
  // Vertical pass
  const out = new Uint8Array(N);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let ok = 1;
      for (let dy = -radius; dy <= radius && ok; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= H || !tmp[yy * W + x]) ok = 0;
      }
      out[y * W + x] = ok;
    }
  }
  return out;
}

function dilate(src, radius) {
  const tmp = new Uint8Array(N);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let any = 0;
      for (let dx = -radius; dx <= radius && !any; dx++) {
        const xx = x + dx;
        if (xx >= 0 && xx < W && src[y * W + xx]) any = 1;
      }
      tmp[y * W + x] = any;
    }
  }
  const out = new Uint8Array(N);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let any = 0;
      for (let dy = -radius; dy <= radius && !any; dy++) {
        const yy = y + dy;
        if (yy >= 0 && yy < H && tmp[yy * W + x]) any = 1;
      }
      out[y * W + x] = any;
    }
  }
  return out;
}

const raw = new Uint8Array(N);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * C;
    if (isBlack(data[i], data[i + 1], data[i + 2]) || isRed(data[i], data[i + 1], data[i + 2])) {
      raw[y * W + x] = 1;
    }
  }
}

// Opening: erode then dilate — kills thin noise
const opened = dilate(erode(raw, OPEN_RADIUS), OPEN_RADIUS);

// Connected-component filtering on the opened mask
const label = new Int32Array(N);
const stack = new Int32Array(N);
const sizes = [0];
const members = [null];
let nextLabel = 1;
for (let s = 0; s < N; s++) {
  if (!opened[s] || label[s]) continue;
  let top = 0;
  stack[top++] = s;
  label[s] = nextLabel;
  const mem = [s];
  while (top > 0) {
    const p = stack[--top];
    const x = p % W, y = (p - x) / W;
    if (x > 0) { const q = p - 1; if (opened[q] && !label[q]) { label[q] = nextLabel; stack[top++] = q; mem.push(q); } }
    if (x < W - 1) { const q = p + 1; if (opened[q] && !label[q]) { label[q] = nextLabel; stack[top++] = q; mem.push(q); } }
    if (y > 0) { const q = p - W; if (opened[q] && !label[q]) { label[q] = nextLabel; stack[top++] = q; mem.push(q); } }
    if (y < H - 1) { const q = p + W; if (opened[q] && !label[q]) { label[q] = nextLabel; stack[top++] = q; mem.push(q); } }
  }
  sizes.push(mem.length);
  members.push(mem);
  nextLabel++;
}

const textCore = new Uint8Array(N);
for (let lbl = 1; lbl < members.length; lbl++) {
  if (sizes[lbl] >= MIN_COMPONENT_PX) {
    for (const p of members[lbl]) textCore[p] = 1;
  }
}

// Zero out core pixels outside the text band — kills any background noise
// blobs that survived the size filter in the top/bottom buffer rows.
for (let y = 0; y < H; y++) {
  if (y >= KEEP_Y_MIN && y <= KEEP_Y_MAX) continue;
  for (let x = 0; x < W; x++) textCore[y * W + x] = 0;
}

// Build the halo region: pixels within HALO_SEARCH_RADIUS of any text-core
// pixel. We'll only keep ones that are actually near-white in the source.
const haloRegion = dilate(textCore, HALO_SEARCH_RADIUS);

const alpha = new Uint8Array(N);
for (let i = 0; i < N; i++) {
  if (textCore[i]) {
    alpha[i] = 1;
  } else if (haloRegion[i]) {
    const si = i * C;
    if (isHalo(data[si], data[si + 1], data[si + 2])) alpha[i] = 1;
  }
}

const rgba = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  const si = i * C;
  rgba[i * 4 + 0] = data[si];
  rgba[i * 4 + 1] = data[si + 1];
  rgba[i * 4 + 2] = data[si + 2];
  rgba[i * 4 + 3] = alpha[i] ? 255 : 0;
}

const png = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
  .trim()
  .png()
  .toBuffer();

await writeFile(OUT, png);
const out = await sharp(png).metadata();
console.log(`wrote ${OUT}: ${out.width} x ${out.height} (${png.length} bytes)`);
