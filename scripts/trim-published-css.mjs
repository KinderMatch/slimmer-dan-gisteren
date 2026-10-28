import { PurgeCSS } from 'purgecss';
import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const root = process.argv[2] ?? 'dist/github-pages';
// Include every published route and component source, so responsive layouts,
// translated pages and states that appear after interaction remain styled.
const results = await new PurgeCSS().purge({
  content: [`${root}/**/*.html`, 'app/**/*.tsx', 'app/**/*.ts'],
  css: [`${root}/assets/*.css`, `${root}/_next/static/css/*.css`],
  safelist: { standard: ['active', 'open', 'error', 'success', 'submitting'], greedy: [/^language-/, /^focus-form-/, /^seo-/, /^is-/, /^has-/] },
  keyframes: false,
  fontFace: false,
  variables: false,
});
for (const result of results) {
  const before = await readFile(result.file, 'utf8');
  await writeFile(result.file, result.css);
  console.log(`CSS ${result.file}: ${gzipSync(before).length} → ${gzipSync(result.css).length} gzip bytes`);
}
