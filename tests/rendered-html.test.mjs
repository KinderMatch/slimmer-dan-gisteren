import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the homepage with crawlable SEO content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="nl">/i);
  assert.match(html, /<title>Slimmer dan Gisteren - SEO, GEO, Google Ads en Social Ads/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/slimmerdangisteren\.nl\/"/i);
  assert.match(html, /Marketing die/);
  assert.match(html, /Groei/);
  assert.match(html, /Plan een strategiesessie/);
});

test("keeps first render visible and light for Lighthouse", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /opacity:0;transform:translateY\(34px\)/);
  assert.doesNotMatch(html, /framer-motion|motion-dom|motion-utils/);
  assert.doesNotMatch(html, /_vinext_fonts/);
  assert.doesNotMatch(html, /\sautoPlay\b/i);
  assert.doesNotMatch(html, /<iframe\b/i);
  assert.match(html, /\/assets\/optimized\/airfoto\.jpg"[^>]+fetchPriority="high"/);
  assert.match(html, /width="1600" height="899"/);
  assert.doesNotMatch(html, /content-creatie|Social media/);
  assert.match(html, /GEO/);
  assert.match(html, /Google Ads/);
});

test("server-renders commercial pages with crawlable SEO directives", async () => {
  for (const path of ["/seo/", "/google-ads/"]) {
    const response = await render(path);
    assert.equal(response.status, 200);

    const html = await response.text();
    assert.match(html, /<!DOCTYPE html><html lang="nl">/i);
    assert.match(html, /<meta charSet="utf-8"\/>/i);
    assert.match(html, /<meta name="description" content="[^"]+"/i);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://slimmerdangisteren\\.nl${path}"`, "i"));
    assert.match(html, /<link rel="alternate" hrefLang="nl-NL"/i);
    assert.match(html, /<meta name="robots" content="(?:index, follow|follow, index)"/i);
    assert.doesNotMatch(html, /\sautoPlay\b/i);
  }
});
