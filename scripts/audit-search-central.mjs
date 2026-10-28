import assert from "node:assert/strict";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

// Inspect the actual static publication, not just React source or the development server.
const root = resolve(process.argv[2] ?? "dist/github-pages");
const origin = "https://slimmerdangisteren.nl";
const decode = (value) => value
  .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
  .replace(/&#([0-9]+);/g, (_, number) => String.fromCodePoint(Number(number)))
  .replace(/&(amp|quot|apos|lt|gt|nbsp);/g, (_, name) => ({ amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " })[name]);
const text = (html) => decode(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const attribute = (tag, name) => decode(tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] ?? "");

async function walk(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) result.push(...await walk(join(directory, entry.name)));
    else if (entry.name === "index.html") result.push(join(directory, entry.name));
  }
  return result;
}

const pages = new Map();
for (const file of await walk(root)) {
  const directory = relative(root, dirname(file));
  const route = directory ? `/${directory}/` : "/";
  const html = await readFile(file, "utf8");
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "";
  const visibleText = text(body);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => decode(match[1])));
  const links = [...html.matchAll(/<a\b[^>]*>/gi)].map(match => attribute(match[0], "href")).filter(Boolean);
  const entities = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(match => { const data = JSON.parse(match[1]); return Array.isArray(data) ? data : [data]; });
  pages.set(route, { html, visibleText, ids, links, entities });
}

const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
assert.equal(new Set(locations).size, locations.length, "Duplicate sitemap URLs");
let faqQuestions = 0;
let checkedLinks = 0;
let checkedAssets = 0;
let checkedLanguageLinks = 0;

for (const [route, page] of pages) {
  // Native disclosures are valid visible content; JavaScript payloads are not evidence of visibility.
  for (const entity of page.entities) {
    if (entity["@type"] !== "FAQPage") continue;
    for (const question of entity.mainEntity ?? []) {
      assert.ok(page.visibleText.includes(text(question.name)), `${route}: FAQ question exists only in markup: ${question.name}`);
      assert.ok(page.visibleText.includes(text(question.acceptedAnswer?.text ?? "")), `${route}: FAQ answer differs from visible content: ${question.name}`);
      faqQuestions++;
    }
  }
  for (const href of page.links) {
    const target = new URL(href, `${origin}${route}`);
    if (target.origin !== origin) continue;
    const path = decodeURIComponent(target.pathname);
    const targetPage = pages.get(path);
    if (targetPage) {
      if (target.hash) assert.ok(targetPage.ids.has(decodeURIComponent(target.hash.slice(1))), `${route}: broken section link ${href}`);
    } else {
      const file = resolve(root, `.${path}`);
      assert.ok(file.startsWith(`${root}/`), `${route}: unexpected local path ${href}`);
      assert.ok(await stat(file).then(value => value.isFile()).catch(() => false), `${route}: broken internal link ${href}`);
    }
    checkedLinks++;
  }
  for (const match of page.html.matchAll(/<(?:img|video|source|script)\b[^>]*>/gi)) {
    for (const name of ["src", "poster"]) {
      const asset = attribute(match[0], name);
      if (!asset.startsWith("/assets/")) continue;
      assert.ok(await stat(join(root, asset)).then(value => value.isFile()).catch(() => false), `${route}: missing asset ${asset}`);
      checkedAssets++;
    }
  }
  for (const match of page.html.matchAll(/<form\b[^>]*>/gi)) {
    const action = attribute(match[0], "action");
    assert.ok(!action.startsWith("/api/"), `${route}: static publication posts a form to an unavailable API: ${action}`);
  }
}

for (const location of locations) {
  const url = new URL(location);
  assert.equal(url.origin, origin);
  const page = pages.get(url.pathname);
  assert.ok(page, `Sitemap page missing: ${location}`);
  const languageToggle = page.html.match(/<div\b[^>]*class="language-toggle"[^>]*>([\s\S]*?)<\/div>/i)?.[1];
  assert.ok(languageToggle, `${location}: missing language selector`);
  const languageLinks = [...languageToggle.matchAll(/<a\b[^>]*>/gi)].map(match => match[0]);
  assert.equal(languageLinks.length, 3, `${location}: language selector must contain crawlable links`);
  const basePath = url.pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  for (const lang of ["nl", "en", "es"]) {
    const link = languageLinks.find(tag => attribute(tag, "hrefLang") === lang);
    const expected = lang === "nl" ? basePath : basePath === "/" ? `/${lang}/` : `/${lang}${basePath}`;
    assert.equal(attribute(link ?? "", "href"), expected, `${location}: wrong language link for ${lang}`);
    checkedLanguageLinks++;
  }
  assert.equal(languageLinks.filter(tag => attribute(tag, "aria-current") === "page").length, 1, `${location}: selected language must be identified once`);

  assert.doesNotMatch(page.html, /<meta\b[^>]*name="(?:robots|googlebot)"[^>]*content="[^"]*noindex/i, `${location}: noindex in sitemap`);
  const canonical = [...page.html.matchAll(/<link\b[^>]*>/gi)].find(match => attribute(match[0], "rel") === "canonical");
  assert.equal(attribute(canonical?.[0] ?? "", "href"), location, `${location}: conflicting canonical`);
  for (const match of page.html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi)) {
    const lang = attribute(match[0], "hrefLang");
    const alternate = attribute(match[0], "href");
    assert.ok(locations.includes(alternate), `${location}: alternate is not an indexable sitemap URL: ${alternate}`);
    const counterpart = pages.get(new URL(alternate).pathname);
    const reciprocal = [...counterpart.html.matchAll(/<link\b[^>]*>/gi)].some(link => attribute(link[0], "rel") === "alternate" && attribute(link[0], "href") === location);
    assert.ok(reciprocal, `${location}: missing reciprocal language link (${lang})`);
  }
}

const admin = pages.get("/campaign-engine/");
assert.match(admin?.html ?? "", /<meta name="robots" content="[^"]*noindex/);
assert.ok(!locations.some(location => new URL(location).pathname === "/campaign-engine/"));
const report = { pages: pages.size, indexableSitemapUrls: locations.length, checkedLinks, checkedAssets, checkedLanguageLinks, visibleFaqQuestions: faqQuestions, result: "passed" };
if (process.argv[3]) await writeFile(process.argv[3], `${JSON.stringify(report, null, 2)}\n`);
console.log("PASS Search Central publication checks:", JSON.stringify(report));
