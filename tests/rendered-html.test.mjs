import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
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
  assert.match(html, /Creative growth studio/);
  assert.doesNotMatch(html, /SEO & Google Ads bureau/);
  assert.doesNotMatch(html, /\/_rsc/);
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
  assert.match(html, /\/assets\/generated\/datacenter-360\.gif"[^>]+width="360" height="190"/);
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
    assert.match(html, /<link rel="alternate" hrefLang="en-US"/i);
    assert.match(html, /<link rel="alternate" hrefLang="es-ES"/i);
    assert.match(html, /<link rel="alternate" hrefLang="x-default"/i);
    assert.match(html, /<meta name="robots" content="(?:index, follow|follow, index)"/i);
    assert.match(html, /toolname="[^"]+-aanvraag"/i);
    assert.match(html, /toolparamdescription="[^"]+"/i);
    assert.doesNotMatch(html, /\sautoPlay\b/i);
    assert.doesNotMatch(html, /\/_rsc/);
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
  const asset = await stat(new URL("../public/assets/generated/datacenter-360.gif", import.meta.url));

  assert.ok(asset.size < 2 * 1024 * 1024, `GEO animation is too large: ${asset.size} bytes`);
});
