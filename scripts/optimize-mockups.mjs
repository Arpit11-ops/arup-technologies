#!/usr/bin/env node
// Convert the mockup PNGs to width-capped WebP so the browser downloads ~200-300 KB
// per hero image instead of 1-2 MB. Keeps the originals in place so we can revert.

import sharp from "sharp";
import { readdir, stat, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = join(HERE, "..", "public", "mockups");
const MAX_WIDTH = 1600;
const QUALITY = 78;

const files = await readdir(DIR);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));

let saved = 0;
for (const name of pngs) {
  const src = join(DIR, name);
  const out = join(DIR, name.replace(/\.png$/i, ".webp"));
  const before = (await stat(src)).size;

  const meta = await sharp(src).metadata();
  const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out);

  const after = (await stat(out)).size;
  saved += before - after;
  console.log(
    `${name.padEnd(30)}  ${(before / 1024).toFixed(0)} KB  →  ${(after / 1024).toFixed(0)} KB (${((1 - after / before) * 100).toFixed(0)}% smaller)`,
  );
}

console.log(`\nTotal saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);

// Delete the PNG originals only after WebP siblings exist
for (const name of pngs) {
  const png = join(DIR, name);
  const webp = join(DIR, name.replace(/\.png$/i, ".webp"));
  const has = await stat(webp).catch(() => null);
  if (has && has.size > 0) {
    await rm(png);
  }
}
console.log("Removed source PNGs.");
