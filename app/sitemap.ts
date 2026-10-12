import type { MetadataRoute } from "next";

import { absoluteUrl, servicePages } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: page.path === "/geo/" || page.path === "/seo/" || page.path === "/google-ads/" ? 0.95 : page.path === "/website/" ? 0.7 : 0.85,
    })),
  ];
}
