import type { MetadataRoute } from "next";

import { localizedPublicPaths, pathForLanguage, supportedLocales } from "./i18n";
import { absoluteUrl } from "./seo";

function priorityForPath(path: string) {
  if (path === "/") return 1;
  if (path === "/geo/" || path === "/seo/" || path === "/google-ads/") return 0.95;
  if (path === "/social-ads/" || path === "/content-creatie/") return 0.85;
  if (path === "/website/") return 0.7;
  return 0.45;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const nlPaths = localizedPublicPaths.map((path) => (path ? `/${path}/` : "/"));
  const localizedPaths = supportedLocales.flatMap((locale) =>
    nlPaths.map((path) => pathForLanguage(path, locale)),
  );

  return [...nlPaths, ...localizedPaths].map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: priorityForPath(path.replace(/^\/(en|es)(?=\/|$)/, "") || "/"),
  }));
}
