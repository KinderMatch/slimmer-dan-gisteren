import type { Language } from "./language";

export const supportedLocales = ["en", "es"] as const;
export type RouteLocale = (typeof supportedLocales)[number];

export const localizedPublicPaths = [
  "",
  "seo",
  "geo",
  "google-ads",
  "social-ads",
  "content-creatie",
  "website",
  "privacy",
  "algemene-voorwaarden",
] as const;

export function normalizeLocale(value: string | undefined): RouteLocale | null {
  return value === "en" || value === "es" ? value : null;
}

export function pathForLanguage(pathname: string, language: Language) {
  const cleanPath = pathname || "/";
  const withoutLocale = cleanPath.replace(/^\/(en|es)(?=\/|$)/, "") || "/";

  if (language === "nl") return withoutLocale;
  if (["/seo/zoekwoordenonderzoek/", "/seo/technische-seo/"].includes(withoutLocale)) return `/${language}/seo/`;
  return withoutLocale === "/" ? `/${language}/` : `/${language}${withoutLocale}`;
}

export function languageAlternates(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: cleanPath,
    languages: {
      "nl-NL": cleanPath,
      "en-US": pathForLanguage(cleanPath, "en"),
      "es-ES": pathForLanguage(cleanPath, "es"),
      "x-default": cleanPath,
    },
  };
}
