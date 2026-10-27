import type { MetadataRoute } from "next";

import { pathForLanguage, supportedLocales } from "./i18n";
import { absoluteUrl } from "./seo";

import contentDates from "./content-dates.json";
const modifiedDates: Record<string, string> = contentDates;
const navigationPaths = ["/", "/geo/", "/seo/", "/google-ads/", "/social-ads/", "/seo/zoekwoordenonderzoek/", "/seo/technische-seo/", "/seo/seo-uitbesteden/", "/seo/lokale-seo/"] as const;

function priorityForPath(path: string) {
  if (path === "/") return 1;
  return 0.95;
}

function changeFrequencyForPath(path: string) {
  if (path === "/") return "weekly" as const;
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
  const nlPaths = [...navigationPaths];
  const localizedPaths = supportedLocales.flatMap((locale) =>
    nlPaths.map((path) => pathForLanguage(path, locale)),
  );

  return [...nlPaths, ...localizedPaths].map((path) => ({
      url: absoluteUrl(path),
      ...(modifiedDates[path] ? { lastModified: new Date(modifiedDates[path]) } : {}),
      changeFrequency: changeFrequencyForPath(path.replace(/^\/(en|es)(?=\/|$)/, "") || "/"),
      priority: priorityForPath(path.replace(/^\/(en|es)(?=\/|$)/, "") || "/"),
      alternates: alternatesForPath(path.replace(/^\/(en|es)(?=\/|$)/, "") || "/"),
  }));
}
