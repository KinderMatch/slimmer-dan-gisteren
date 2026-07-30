import type { MetadataRoute } from "next";

import { absoluteUrl, siteUrl } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: "/",
        userAgent: "*",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
