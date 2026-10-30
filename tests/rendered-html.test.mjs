import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

// GitHub Pages serves the prerendered files, without a Cloudflare runtime.
async function render(path = "/") {
  const relativePath = path.replace(/^\//, "");
  return readFile(new URL(`../dist/server/prerendered-routes/${relativePath}index.html`, import.meta.url), "utf8");
}

test("prerenders the homepage with crawlable SEO content", async () => {
  const html = await render();
  assert.match(html, /<html lang="nl">/i);
  assert.match(html, /<title>SEO, GEO, Google Ads en Social Ads \| Slimmer dan Gisteren<\/title>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/slimmerdangisteren\.nl\/"/i);
  assert.match(html, /Marketing die/);
  assert.match(html, /Groei/);
  assert.match(html, /Plan een strategiesessie/);
  assert.match(html, /Creative growth studio/);
  assert.doesNotMatch(html, /SEO & Google Ads bureau/);
  assert.doesNotMatch(html, /\/_rsc/);
});

test("keeps first render visible and light for Lighthouse", async () => {
  const html = await render();

  assert.doesNotMatch(html, /opacity:0;transform:translateY\(34px\)/);
  assert.doesNotMatch(html, /framer-motion|motion-dom|motion-utils/);
  assert.doesNotMatch(html, /_vinext_fonts/);
  assert.doesNotMatch(html, /\sautoPlay\b/i);
  assert.doesNotMatch(html, /<iframe\b/i);
  assert.match(html, /<img[^>]*fetchPriority="high"[^>]*src="\/assets\/optimized\/airfoto\.jpg"/);
  assert.match(html, /width="1600" height="899"/);
  assert.match(html, /<footer class="premium-footer">[\s\S]*href="\/website\/"/);
  assert.match(html, /<footer class="premium-footer">[\s\S]*href="\/content-creatie\/"/);
  assert.match(html, /<footer class="premium-footer">[\s\S]*Social media/);
  assert.match(html, /GEO/);
  assert.match(html, /poster="\/assets\/generated\/geo-globe-poster\.webp"/);
  assert.doesNotMatch(html, /<img[^>]+datacenter-320\.gif/);
  assert.match(html, /\/assets\/optimized\/social-ads-schilder\.jpg"[^>]+width="800" height="707"/);
  assert.match(html, /Google Ads/);
});

test("prerenders commercial pages with crawlable SEO directives", async () => {
  for (const path of ["/seo/", "/google-ads/"]) {
    const html = await render(path);
    assert.match(html, /<!DOCTYPE html><html lang="nl">/i);
    assert.match(html, /<meta charSet="utf-8"\/>/i);
    assert.match(html, /<meta name="description" content="[^"]+"/i);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://slimmerdangisteren\\.nl${path}"`, "i"));
    assert.match(html, /<link rel="alternate" hrefLang="nl-NL"/i);
    assert.match(html, /<link rel="alternate" hrefLang="en-US"/i);
    assert.match(html, /<link rel="alternate" hrefLang="es-ES"/i);
    assert.match(html, /<link rel="alternate" hrefLang="x-default"/i);
    assert.match(html, /<meta name="robots" content="(?:index, follow|follow, index)"/i);
    assert.match(html, /toolname="[^"]+-aanvraag"/i);
    assert.match(html, /toolparamdescription="[^"]+"/i);
    assert.match(html, /<header class="premium-nav">/);
    assert.match(html, /class="premium-brand"/);
    assert.doesNotMatch(html, /class="site-header"/);
    assert.match(html, /href="\/geo\/"/);
    assert.match(html, /href="\/seo\/"/);
    assert.match(html, /href="\/google-ads\/"/);
    assert.match(html, /href="\/social-ads\/"/);
    assert.doesNotMatch(html, /\sautoPlay\b/i);
    assert.doesNotMatch(html, /\/_rsc/);
  }
});

test("server-rendered local images include explicit dimensions on priority pages", async () => {
  for (const path of ["/", "/seo/", "/google-ads/"]) {
    const html = await render(path);
    const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];
    const localImages = imageTags.filter((tag) => /src="\/assets\//i.test(tag));

    assert.ok(localImages.length > 0, `Expected local images on ${path}`);

    for (const tag of localImages) {
      assert.match(tag, /\bwidth="[^"]+"/i, `Missing width on ${path}: ${tag}`);
      assert.match(tag, /\bheight="[^"]+"/i, `Missing height on ${path}: ${tag}`);
    }
  }
});

test("llms.txt keeps agent-facing links in recommended markdown form", async () => {
  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");

  assert.match(llms, /^# Slimmer dan Gisteren/m);
  assert.match(llms, /\[SEO\]\(https:\/\/slimmerdangisteren\.nl\/seo\/\)/);
  assert.match(llms, /\[Google Ads\]\(https:\/\/slimmerdangisteren\.nl\/google-ads\/\)/);
  assert.doesNotMatch(llms, /^- https:\/\/slimmerdangisteren\.nl\/seo\//m);
});

test("GEO animation stays small enough for PageSpeed", async () => {
  const asset = await stat(new URL("../public/assets/generated/datacenter-320.mp4", import.meta.url));

  assert.ok(asset.size < 200 * 1024, `GEO animation is too large: ${asset.size} bytes`);
});

test("SEO enquiry uses an explicit email draft on static hosting and section links resolve", async () => {
  const html = await render("/seo/");
  assert.doesNotMatch(html, /action="mailto:/);
  assert.match(html, /<button type="submit" disabled="">Zet mijn aanvraagmail klaar/);
  assert.doesNotMatch(html, /action="\/api\/scan"/);
  assert.match(html, /Zet mijn aanvraagmail klaar/);
  assert.doesNotMatch(html, /name="Bedrijfsnaam"/);
  assert.match(html, /Je verstuurt deze daarna vanuit je eigen e-mailprogramma/);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${id}"`), `Missing section target: ${id}`);
  }
  const adsHtml = await render("/google-ads/");
  assert.doesNotMatch(adsHtml, /action="\/api\/scan"/);
  assert.match(adsHtml, /Je verstuurt deze daarna vanuit je eigen e-mailprogramma/);
});

test("SEO animation keeps the initial page light without removing its content", async () => {
  const html = await render("/seo/");
  assert.match(html, /poster="\/assets\/seo-search-poster.webp"/);
  assert.doesNotMatch(html, /<img[^>]+seo-google-search/);
  assert.ok((await stat('public/assets/seo-search.mp4')).size < 100000);
  assert.ok((await stat('public/assets/seo-search-poster.webp')).size < 10000);
});

test("SEO FAQ groups preserve every structured question in accessible native disclosures", async () => {
  const html = await render("/seo/");
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  const entities = scripts.flatMap(item => Array.isArray(item) ? item : [item]);
  const faq = entities.find(item => item["@type"] === "FAQPage");
  assert.ok(faq?.mainEntity.length > 8);
  const summaries = [...html.matchAll(/<summary[^>]*>(.*?)<\/summary>/gs)].map(m => m[1].replaceAll("&#x27;", "'").replaceAll("&amp;", "&"));
  for (const item of faq.mainEntity) assert.equal(summaries.filter(text => text === item.name).length, 1, item.name);
  assert.equal((html.match(/class="seo-faq-group"/g) ?? []).length, 3);
  assert.match(html, /Jimmy neemt daarna contact met je op/);
});

test("translated service pages retain the Dutch sections, FAQs, form semantics and local links", async () => {
  const decode = text => text.replaceAll("&#x27;", "'").replaceAll("&quot;", '"').replaceAll("&amp;", "&");
  for (const path of ['seo', 'geo', 'google-ads']) {
    const nl = await readFile(`dist/server/prerendered-routes/${path}/index.html`, 'utf8');
    const main = html => html.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? '';
    const structure = html => [...main(html).matchAll(/<(section|article|details|summary|h[1-6]|input|textarea|video)\b/g)].map(m => m[1]);
    const fields = html => [...main(html).matchAll(/<(input|textarea)\b[^>]*>/g)].map(m => m[0]);
    for (const locale of ['en', 'es']) {
      const html = await readFile(`dist/server/prerendered-routes/${locale}/${path}/index.html`, 'utf8');
      assert.deepEqual(structure(html), structure(nl), `${locale}/${path}: content structure`);
      for (const attr of ['name', 'type', 'required', 'autocomplete']) {
        const values = tags => tags.map(tag => tag.match(new RegExp(`\\b${attr}="([^"]*)"`))?.[1] ?? null);
        assert.deepEqual(values(fields(html)), values(fields(nl)), `${locale}/${path}: ${attr}`);
      }
      for (const [, id] of main(html).matchAll(/href="#([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), `Missing ${id}`);
      assert.ok(html.includes(`rel="canonical" href="https://slimmerdangisteren.nl/${locale}/${path}/"`));
      const schema = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m => JSON.parse(m[1]));
      const faq = schema.find(item => item['@type'] === 'FAQPage');
      const summaries = [...html.matchAll(/<summary[^>]*>(.*?)<\/summary>/gs)].map(m => decode(m[1]));
      for (const item of faq.mainEntity) assert.equal(summaries.filter(text => text === item.name).length, 1, `${locale}: ${item.name}`);
      if (path === 'seo') {
        const nlSchema = [...nl.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(m => JSON.parse(m[1]));
        assert.equal(faq.mainEntity.length, nlSchema.find(item => item['@type'] === 'FAQPage').mainEntity.length);
        assert.ok(html.includes(`href="/${locale}/seo/zoekwoordenonderzoek/"`));
        assert.ok(html.includes(`href="/${locale}/seo/technische-seo/"`));
        assert.ok(html.includes(`href="/downloads/seo-verbeterplan-${locale}.csv"`));
        assert.doesNotMatch(main(html), /Wat gebeurt er daarna|Gratis scan|Je werkt rechtstreeks|Smarter than Yesterday|Más inteligente que ayer/);
      }
    }
  }
});
