import type { MetadataRoute } from "next";

import { localizedPublicPaths, pathForLanguage, supportedLocales } from "./i18n";
import { absoluteUrl } from "./seo";

const lastModified = new Date("2026-10-12");

function priorityForPath(path: string) {
  if (path === "/") return 1;
  if (path === "/geo/" || path === "/seo/" || path === "/google-ads/") return 0.95;
  if (path === "/social-ads/" || path === "/content-creatie/") return 0.85;
  if (path === "/website/") return 0.7;
  return 0.45;
}

function changeFrequencyForPath(path: string) {
  if (path === "/") return "weekly" as const;
  if (path === "/privacy/" || path === "/algemene-voorwaarden/") return "yearly" as const;
  return "monthly" as const;
}

function alternatesForPath(path: string) {
  return {
    languages: {
      "nl-NL": absoluteUrl(path),
      "en-US": absoluteUrl(pathForLanguage(path, "en")),
      "es-ES": absoluteUrl(pathForLanguage(path, "es")),
      "x-default": absoluteUrl(path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const nlPaths = localizedPublicPaths.map((path) => (path ? `/${path}/` : "/"));
  const localizedPaths = supportedLocales.flatMap((locale) =>
    nlPaths.map((path) => pathForLanguage(path, locale)),
  );

  return [...nlPaths, ...localizedPaths].map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: changeFrequencyForPath(path.replace(/^\/(en|es)(?=\/|$)/, "") || "/"),
      priority: priorityForPath(path.replace(/^\/(en|es)(?=\/|$)/, "") || "/"),
      alternates: alternatesForPath(path.replace(/^\/(en|es)(?=\/|$)/, "") || "/"),
  }));
}
