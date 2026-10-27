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

// Retired WordPress URLs must remain genuine 404s, never indexable placeholder pages.
const retiredPaths = JSON.parse(await readFile('scripts/retired-paths.json', 'utf8'));
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const contentDates = JSON.parse(await readFile('app/content-dates.json', 'utf8'));
for (const block of sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
  const location = block.match(/<loc>(.*?)<\/loc>/)[1];
  const path = new URL(location).pathname;
  const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
  assert.equal(lastmod, contentDates[path], `${path}: sitemap must use a verified content date, not the build date`);
}
console.log('PASS sitemap modification dates match verified content changes');
for (const path of retiredPaths) {
  await assert.rejects(access(join(root, path, 'index.html')), { code: 'ENOENT' }, `${path}: retired URL was published again`);
  assert.ok(!sitemap.includes(`https://slimmerdangisteren.nl${path}<`), `${path}: retired URL in sitemap`);
}
const notFound = await readFile(join(root, '404.html'), 'utf8');
assert.match(notFound, /<meta name="robots" content="noindex, follow">/);
assert.doesNotMatch(notFound, /http-equiv="refresh"/i);
assert.equal((await readFile(join(root, 'CNAME'), 'utf8')).trim(), 'slimmerdangisteren.nl');
console.log('PASS retired URLs stay unpublished; 404 is noindex; hosting domain matches canonicals');

for (const slug of ['zoekwoordenonderzoek', 'technische-seo']) {
  const route = `/seo/${slug}/`;
  const html = await readFile(join(root, route, 'index.html'), 'utf8');
  assert.ok(html.includes(`rel="canonical" href="https://slimmerdangisteren.nl${route}"`));
  assert.match(html, /hrefLang="en-US"/);
  assert.match(html, /hrefLang="es-ES"/);
  assert.doesNotMatch(html, /<meta name="robots"[^>]*noindex/);
  assert.ok(html.includes('href="/seo/"'));
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(sitemap.includes(`https://slimmerdangisteren.nl${route}</loc>`));
  for (const locale of ["en", "es"]) {
    assert.ok(sitemap.includes(`https://slimmerdangisteren.nl/${locale}${route}`));
    const translated = await readFile(join(root, locale, route, "index.html"), "utf8");
    assert.ok(translated.includes(`rel="canonical" href="https://slimmerdangisteren.nl/${locale}${route}"`));
  }
  console.log(`PASS ${route}: translated guides, canonicals, sitemap and link to SEO service`);
}

// Sitemaps advertise only canonical, indexable pages. Legal/retired routes stay excluded.
const sitemapLocations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const indexedHtml = [];
for (const location of sitemapLocations) {
  const path = new URL(location).pathname;
  const html = await readFile(join(root, path, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /<meta name="(?:robots|googlebot)"[^>]*noindex/i, `${path}: noindex URL in sitemap`);
  assert.ok(html.includes(`rel="canonical" href="${location}"`), `${path}: sitemap URL is not canonical`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && title.length <= 70, `${path}: title needs editorial review (${title?.length})`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    const parsed = JSON.parse(match[1]);
    for (const item of Array.isArray(parsed) ? parsed : [parsed]) {
      if (item['@id'] === 'https://slimmerdangisteren.nl/#organization') {
        assert.equal(item['@type'], 'Organization', `${path}: remote agency must not claim an incomplete local listing`);
        assert.equal(item.founder.name, 'Jimmy Buitenhuis');
      }
    }
  }
  indexedHtml.push({ path, html });
}
for (const {path} of indexedHtml) {
  assert.ok(indexedHtml.some(page => page.path !== path && page.html.includes(`href="${path}"`)), `${path}: indexable page has no internal incoming link`);
}
for (const locale of ['', 'en', 'es']) {
  const prefix = locale ? `/${locale}` : '';
  for (const slug of ['privacy', 'algemene-voorwaarden', 'website', 'content-creatie']) {
    const path = `${prefix}/${slug}/`;
    assert.ok(!sitemapLocations.some(url => new URL(url).pathname === path), `${path}: excluded route reintroduced in sitemap`);
    const html = await readFile(join(root, path, 'index.html'), 'utf8');
    assert.match(html, /<meta name="robots"[^>]*noindex/i, `${path}: intentional noindex removed`);
  }
}
console.log('PASS sitemap excludes noindex pages; indexable pages have concise titles, canonical URLs and incoming links; agency schema is consistent');

// Google must be able to retrieve the page's text and rendering assets without JavaScript.
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert.match(robots, /Allow: \/(?:\r?\n|$)/);
assert.doesNotMatch(robots, /Disallow: \/(?:assets|_next|seo)(?:\/|\s|$)/i);
for (const { path, html } of indexedHtml) {
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${path}: expected one descriptive main heading`);
  assert.match(html, /<h1\b[^>]*>[^]*?<\/h1>/, `${path}: missing prerendered heading`);
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    assert.match(tag, /\balt="[^"]*"/, `${path}: missing image alternative (empty is valid for decoration)`);
  }
  for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${fragment}"`), `${path}: broken section link #${fragment}`);
  }
}
console.log('PASS indexable pages expose headings, image alternatives and working section links; rendering paths remain crawlable');
