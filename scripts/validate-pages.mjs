import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.argv[2] ?? 'dist/github-pages';
const paths = ['', 'geo', 'seo', 'google-ads', 'social-ads'];
for (const locale of ['', 'en', 'es']) {
  for (const path of paths) {
    const route = [locale, path].filter(Boolean).join('/');
    const urlPath = route ? `/${route}/` : '/';
    const html = await readFile(join(root, route, 'index.html'), 'utf8');
    assert.match(html, /^<!doctype html>/i, `${urlPath}: missing doctype`);
    assert.match(html, new RegExp(`<html lang="${locale || 'nl'}"`), urlPath);
    assert.match(html, /<meta charset="utf-8"/i, urlPath);
    assert.match(html, /<meta name="description" content="[^"]+"/i, urlPath);
    assert.ok(html.includes(`<link rel="canonical" href="https://slimmerdangisteren.nl${urlPath}"`), `${urlPath}: incorrect canonical`);
    assert.doesNotMatch(html, /<meta name="(?:robots|googlebot)"[^>]*noindex/i, urlPath);
    for (const lang of ['nl-NL','en-US','es-ES','x-default']) {
      assert.ok(html.includes(`hrefLang="${lang}"`), `${urlPath}: missing ${lang}`);
    }
    for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
      assert.match(tag, /\bwidth="\d+"/, `${urlPath}: missing image width`);
      assert.match(tag, /\bheight="\d+"/, `${urlPath}: missing image height`);
      for (const match of tag.matchAll(/(?:src="|, |srcSet=")(\/assets\/[^" ,]+)/g)) {
        await access(join(root, match[1]));
      }
    }
    console.log(`PASS ${urlPath}: SEO metadata, language, image dimensions and assets`);
  }
}
const images = JSON.parse(await readFile('app/responsive-images.json','utf8'));
for (const image of Object.values(images)) for (const variant of image.variants) await access(join(root, variant.src));
console.log('PASS all responsive image variants exist in the publish artifact');
