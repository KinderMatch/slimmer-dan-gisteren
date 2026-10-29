import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Preserve originals; replace only the generated previews flagged by PageSpeed.
const manifestPath = 'app/responsive-images.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const hero = '/assets/optimized/airfoto.jpg';
for (const variant of manifest[hero].variants) {
  const data = await sharp(`public${hero}`).resize({ width: variant.width }).webp({ quality: 64, effort: 6 }).toBuffer();
  const hash = createHash('sha256').update(data).digest('hex').slice(0, 12);
  const path = `/assets/responsive/airfoto-${variant.width}-${hash}.webp`;
  await writeFile(`public${path}`, data);
  console.log(`${variant.width}px hero: ${variant.bytes} -> ${data.length} bytes`);
  variant.src = path;
  variant.bytes = data.length;
}
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

let thumbnails = await readFile('app/video-thumbnails.ts', 'utf8');
for (const name of ['speech-ceo-nl.mp4', 'speech-ceo-en.mp4', 'speech-ceo-es.mp4', 'ai-actors-slimmer-dan-gisteren.m4v']) {
  const original = `/assets/video-thumbnails/${name}.webp`;
  const data = await sharp(`public${original}`).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toBuffer();
  const hash = createHash('sha256').update(data).digest('hex').slice(0, 12);
  const path = `/assets/video-thumbnails/${name}-640-${hash}.webp`;
  await writeFile(`public${path}`, data);
  thumbnails = thumbnails.replaceAll(`"${original}"`, `"${path}"`);
  console.log(`${name} poster: ${(await readFile(`public${original}`)).length} -> ${data.length} bytes`);
}
await writeFile('app/video-thumbnails.ts', thumbnails);
