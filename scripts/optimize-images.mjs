import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Keep originals for full-size views; serve appropriately sized WebP previews.
const dimensions = await readFile('app/image-dimensions.ts', 'utf8');
const sources = [...dimensions.matchAll(/"(\/assets\/[^\"]+\.(?:jpg|png))":/g)].map(match => match[1]);
sources.push("/assets/seo-google-search.gif");
const manifest = {};
await mkdir('public/assets/responsive', { recursive: true });
for (const src of sources) {
  const input = await readFile(`public${src}`);
  const animated = src.endsWith('.gif');
  const metadata = await sharp(input, { animated }).metadata();
  const widths = animated ? [320, metadata.width] : [...new Set([...(src.endsWith('/logo.png') ? [64, 128, 256] : [480, 960]), Math.min(metadata.width, 1600)])].filter(w => w <= metadata.width).sort((a,b) => a-b);
  const variants = [];
  for (const width of widths) {
    const output = await sharp(input, { animated }).resize({ width, withoutEnlargement: true }).webp({ quality: animated ? 60 : 82, effort: 5 }).toBuffer();
    const hash = createHash('sha256').update(output).digest('hex').slice(0, 12);
    const name = `${src.split('/').pop().replace(/\.[^.]+$/, '')}-${width}-${hash}.webp`;
    await writeFile(`public/assets/responsive/${name}`, output);
    variants.push({ src: `/assets/responsive/${name}`, width, bytes: output.length });
  }
  manifest[src] = { width: metadata.width, height: metadata.pageHeight ?? metadata.height, variants };
  console.log(`${src}: ${input.length} → ${variants.at(-1).bytes} bytes`);
}
await writeFile('app/responsive-images.json', `${JSON.stringify(manifest, null, 2)}\n`);
