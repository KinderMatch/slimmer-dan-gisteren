import { cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { pathForLanguage } from "./i18n";
import type { Language } from "./language";
import en from "./translations/en.json";
import es from "./translations/es.json";

const dictionaries: Record<string, Record<string, string>> = { en, es };
export function translateCopy(text: string, locale: Language): string {
  if (locale === "nl" || !text.trim()) return text;
  const key = text.replace(/\s+/g, " ").trim();
  const translated = dictionaries[locale]?.[key];
  if (translated !== undefined) return `${/^\s/.test(text) ? " " : ""}${translated}${/\s$/.test(text) ? " " : ""}`;
  // Emphasis markers are presentation, not a separate content version.
  if (text.includes("[[")) return text.split(/(\[\[.*?\]\])/g).map(part => part.startsWith("[[") ? `[[${translateCopy(part.slice(2, -2), locale)}]]` : translateCopy(part, locale)).join("");
  return text;
}

export function localizedHref(href: string, locale: Language): string {
  if (locale === "nl") return href;
  if (href === "/downloads/seo-verbeterplan.csv") return `/downloads/seo-verbeterplan-${locale}.csv`;
  if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/assets/") && !href.startsWith("/downloads/")) return pathForLanguage(href, locale);
  return href.replace("?hl=nl", `?hl=${locale}`);
}

// Only the explicitly supplied, hook-free server components are expanded.
// Client components keep their identity, handlers and hydration boundaries.
export function localizeServiceTree(node: ReactNode, locale: Language, expand: Set<unknown> = new Set()): ReactNode {
  if (locale === "nl") return node;
  if (typeof node === "string") return translateCopy(node, locale);
  if (Array.isArray(node)) return node.map(item => localizeServiceTree(item, locale, expand));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  if (expand.has(element.type)) {
    const render = element.type as unknown as (props: Record<string, unknown>) => ReactNode;
    return localizeServiceTree(render(element.props), locale, expand);
  }
  const props: Record<string, unknown> = {};
  for (const key of ["alt", "aria-label", "title", "value", "pageTitle", "submitLabel"]) {
    if (typeof element.props[key] === "string") props[key] = translateCopy(element.props[key] as string, locale);
  }
  if (typeof element.props.href === "string") props.href = localizedHref(element.props.href, locale);
  // Form field keys remain Dutch so validation and submission are identical.
  if (Array.isArray(element.props.fields)) props.language = locale;
  if (element.props.children !== undefined) props.children = localizeServiceTree(element.props.children as ReactNode, locale, expand);
  return cloneElement(element, props);
}

export function localizeStructuredData(value: unknown, locale: Language, key = ""): unknown {
  if (locale === "nl") return value;
  if (Array.isArray(value)) return value.map(item => localizeStructuredData(item, locale, key));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k,v]) => [k, localizeStructuredData(v, locale, k)]));
  if (typeof value !== "string") return value;
  if (["name", "description", "text", "serviceType"].includes(key)) return translateCopy(value, locale);
  if (key === "inLanguage") return locale === "en" ? "en-US" : "es-ES";
  if (["@id", "url", "item", "termsOfService"].includes(key) && value.startsWith("https://slimmerdangisteren.nl/") && !/#(organization|website)$/.test(value)) {
    return `https://slimmerdangisteren.nl${localizedHref(value.slice("https://slimmerdangisteren.nl".length), locale)}`;
  }
  return value;
}
