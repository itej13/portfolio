/** Encode alpha frames; node scripts/armor-pack.mjs [--preview | --frames-only]. */
import assert from 'node:assert/strict';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const source = '/private/tmp/portfolio-cadnav-renders';
const output = path.resolve('public/armor');
await mkdir(output, { recursive: true });
if (process.argv.includes('--preview')) {
  await sharp(path.join(source, 'preview.png')).webp({ quality: 88, alphaQuality: 100, effort: 6 }).toFile(path.join(output, 'poster.webp'));
  await sharp(path.join(source, 'preview.png')).flatten({ background: '#08090b' }).png().toFile(path.join(source, 'preview-on-black.png'));
  console.log(path.join(source, 'preview-on-black.png'));
} else {
  const frames = (await readdir(source)).filter((name) => /^frame-\d{3}\.png$/.test(name)).sort();
  assert.equal(frames.length, 96, 'Expected 96 rendered frames');
  let bytes = 0;
  for (const [index, name] of frames.entries()) {
    assert.equal(name, `frame-${String(index).padStart(3, '0')}.png`);
    const destination = path.join(output, name.replace('.png', '.webp'));
    await sharp(path.join(source, name)).webp({ quality: 80, alphaQuality: 95, effort: 6 }).toFile(destination);
    const metadata = await sharp(destination).metadata();
    assert.equal(metadata.width, 900);
    assert.equal(metadata.height, 1100);
    assert.equal(metadata.hasAlpha, true);
    bytes += (await stat(destination)).size;
  }
  if (!process.argv.includes('--frames-only')) {
    const poster = (await readdir(source)).includes('poster.png') ? 'poster.png' : 'frame-000.png';
    await sharp(path.join(source, poster)).webp({ quality: 87, alphaQuality: 100, effort: 6 }).toFile(path.join(output, 'poster.webp'));
  }
  console.log(`Validated 96 RGBA WebP frames, ${(bytes / 1024 / 1024).toFixed(2)} MiB total.`);
}
