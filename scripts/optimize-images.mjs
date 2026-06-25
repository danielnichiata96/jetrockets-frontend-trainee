// Optimise the hero phone screenshots.
//
// Figma exports them as SVGs with a full-resolution raster embedded
// (~1.2 MB each). This rasterises them to WebP with transparency at ~2× their
// display size, cutting the hero from ~3.6 MB to a few hundred KB.
//
// Usage: npm run optimize:images   (reads source SVGs from src/hero/)

import sharp from "sharp";
import { readFileSync, statSync } from "node:fs";

// width = 2× the native Figma width, for crisp rendering on retina screens.
const targets = [
  { in: "src/hero/hero-a.svg", out: "assets/images/hero-a.webp", width: 512 },
  { in: "src/hero/hero-b.svg", out: "assets/images/hero-b.webp", width: 512 },
  { in: "src/hero/hero-c.svg", out: "assets/images/hero-c.webp", width: 666 },
  // Logo is tiny on screen but a smooth gradient ring → higher quality.
  { in: "src/logo.svg", out: "assets/images/logo.webp", width: 96, quality: 92 },
];

const kb = (bytes) => Math.round(bytes / 1024);

for (const t of targets) {
  const before = kb(statSync(t.in).size);
  // High render density, then downscale to the target width for clean edges.
  const { size } = await sharp(readFileSync(t.in), { density: 300 })
    .resize({ width: t.width })
    .webp({ quality: t.quality ?? 82, alphaQuality: 90, effort: 5 })
    .toFile(t.out);
  console.log(`${t.out}  ${before} KB → ${kb(size)} KB`);
}
