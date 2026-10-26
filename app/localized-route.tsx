import type { Metadata } from "next";

import TermsPage, { metadata as termsMetadata } from "./algemene-voorwaarden/page";
import ContentPage, { metadata as contentMetadata } from "./content-creatie/page";
import { geoPage, googleAdsPage, seoPage } from "./growth-pages-data";
import { localizedPublicPaths, pathForLanguage, type RouteLocale } from "./i18n";
import { JsonLd } from "./json-ld";
import { FocusServicePage } from "./focus-service-page";
import { translateCopy } from "./localize-service-tree";
import Home, { metadata as homeMetadata } from "./page";
import PrivacyPage, { metadata as privacyMetadata } from "./privacy/page";
import SocialAdsPage, { metadata as socialMetadata } from "./social-ads/page";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, siteName } from "./seo";
import { SiteShell } from "./site-content";
import WebsitePage, { metadata as websiteMetadata } from "./website/page";

export type LocalizedPagePath = (typeof localizedPublicPaths)[number];

const pageMeta = {
  en: {
    homeTitle: "Slimmer dan Gisteren - GEO, SEO, Google Ads and Social Ads",
    homeDescription: "Marketing agency for companies that want GEO, SEO, Google Ads, Social Ads and content to work together for visible growth.",
    seoTitle: "SEO Marketing Agency | SEO Agency for More Enquiries",
    seoDescription: "SEO marketing agency for companies that want to become more visible in Google with a clear strategy for technology, content, authority and conversion.",
    geoTitle: "GEO Agency | Become Visible in AI Answers",
    geoDescription: "Improve your chances of being found, mentioned and recommended in AI answers from ChatGPT, Gemini, Perplexity and Google AI Overviews.",
    adsTitle: "Google Ads Agency | More Leads and Revenue with Google Ads",
    adsDescription: "Google Ads management for Search, Shopping, Performance Max, YouTube and remarketing campaigns focused on leads, revenue and return.",
    socialAdsTitle: "Social Ads Agency | Meta and LinkedIn Campaigns",
    socialAdsDescription: "Social Ads for Meta, LinkedIn, retargeting and lead generation with clear creative, landing pages and tracking.",
    contentTitle: "Social Media Content Creation | Video and Photography",
    contentDescription: "Content creation, video, photography, social posts, event content and visual formats for stronger campaigns.",
    websiteTitle: "Website Design and Management | SEO-Friendly Websites",
    websiteDescription: "Websites, website management, tracking, conversion and SEO foundations for companies that want a manageable website.",
    privacyTitle: "Privacy Statement | Slimmer dan Gisteren",
    privacyDescription: "Privacy statement for website visits, contact, proposals, projects, analytics and collaboration with Slimmer dan Gisteren.",
    termsTitle: "Terms and Conditions | Slimmer dan Gisteren",
    termsDescription: "Terms and conditions for projects, website management, marketing, content creation and ongoing collaboration.",
  },
  es: {
    homeTitle: "Slimmer dan Gisteren - GEO, SEO, Google Ads y Social Ads",
    homeDescription: "Agencia de marketing para empresas que quieren que GEO, SEO, Google Ads, Social Ads y contenido trabajen juntos para crecer con claridad.",
    seoTitle: "Agencia de SEO Marketing | Agencia SEO para Más Solicitudes",
    seoDescription: "Agencia SEO para empresas que quieren ser más visibles en Google con una estrategia clara de técnica, contenido, autoridad y conversión.",
    geoTitle: "Agencia GEO | Visibilidad en Respuestas de IA",
    geoDescription: "Aumenta la probabilidad de que tu marca sea encontrada, mencionada y recomendada en respuestas de ChatGPT, Gemini, Perplexity y Google AI Overviews.",
    adsTitle: "Agencia Google Ads | Más Leads y Ventas con Google Ads",
    adsDescription: "Gestión de Google Ads para Search, Shopping, Performance Max, YouTube y remarketing con foco en leads, ventas y retorno.",
    socialAdsTitle: "Agencia Social Ads | Campañas en Meta y LinkedIn",
    socialAdsDescription: "Social Ads para Meta, LinkedIn, retargeting y generación de leads con creatividad, landing pages y tracking claros.",
    contentTitle: "Creación de Contenido para Redes | Video y Fotografía",
    contentDescription: "Creación de contenido, video, fotografía, posts, eventos y formatos visuales para campañas más fuertes.",
    websiteTitle: "Diseño y Gestión Web | Webs Preparadas para SEO",
    websiteDescription: "Webs, gestión web, tracking, conversión y base SEO para empresas que quieren una web clara y gestionable.",
    privacyTitle: "Privacidad | Slimmer dan Gisteren",
    privacyDescription: "Declaración de privacidad para visitas web, contacto, propuestas, proyectos, analítica y colaboración con Slimmer dan Gisteren.",
    termsTitle: "Condiciones Generales | Slimmer dan Gisteren",
    termsDescription: "Condiciones generales para proyectos, gestión web, marketing, creación de contenido y colaboraciones recurrentes.",
  },
} satisfies Record<RouteLocale, Record<string, string>>;

const localizedMetadataByPath = {
  "": ["homeTitle", "homeDescription"],
  seo: ["seoTitle", "seoDescription"],
  geo: ["geoTitle", "geoDescription"],
  "google-ads": ["adsTitle", "adsDescription"],
  "social-ads": ["socialAdsTitle", "socialAdsDescription"],
  "content-creatie": ["contentTitle", "contentDescription"],
  website: ["websiteTitle", "websiteDescription"],
  privacy: ["privacyTitle", "privacyDescription"],
  "algemene-voorwaarden": ["termsTitle", "termsDescription"],
} satisfies Record<LocalizedPagePath, [keyof (typeof pageMeta)["en"], keyof (typeof pageMeta)["en"]]>;

const indexedLocalizedPaths = new Set<LocalizedPagePath>(["", "seo", "geo", "google-ads", "social-ads"]);

function canonicalFor(locale: RouteLocale, path: LocalizedPagePath) {
  return pathForLanguage(path ? `/${path}/` : "/", locale);
}

export function localizedMetadata(locale: RouteLocale, path: LocalizedPagePath): Metadata {
  const meta = pageMeta[locale];
  const canonical = canonicalFor(locale, path);
  const languages = {
    "nl-NL": path ? `/${path}/` : "/",
    "en-US": pathForLanguage(path ? `/${path}/` : "/", "en"),
    "es-ES": pathForLanguage(path ? `/${path}/` : "/", "es"),
    "x-default": path ? `/${path}/` : "/",
  };
  const [titleKey, descriptionKey] = localizedMetadataByPath[path];
  const service = path === "seo" ? seoPage : path === "geo" ? geoPage : path === "google-ads" ? googleAdsPage : null;
  const source = service?.metadata ?? ({ "": homeMetadata, "social-ads": socialMetadata, "content-creatie": contentMetadata, website: websiteMetadata, privacy: privacyMetadata, "algemene-voorwaarden": termsMetadata } as Record<string, Metadata>)[path];
  const title = source ? translateCopy(source.title as string, locale) : meta[titleKey];
  const description = source ? translateCopy(source.description as string, locale) : meta[descriptionKey];

  return {
    title,
    description,
    robots: indexedLocalizedPaths.has(path) ? undefined : { index: false, follow: true },
    alternates: { canonical, languages },
    openGraph: { title, description, url: absoluteUrl(canonical), siteName, locale: locale === "en" ? "en_US" : "es_ES", type: "website" },
  };
}

export function LocalizedRoutePage({ locale, path }: { locale: RouteLocale; path: LocalizedPagePath }) {
  if (!path) return <Home initialLanguage={locale} />;

  if (path === "seo" || path === "geo" || path === "google-ads") {
    const data = path === "seo" ? seoPage : path === "geo" ? geoPage : googleAdsPage;

    return (
      <>
        <JsonLd
          data={[
            breadcrumbJsonLd([{ name: "Home", path: canonicalFor(locale, "") }, { name: translateCopy(data.eyebrow, locale), path: canonicalFor(locale, path) }]),
            { ...serviceJsonLd(data.slug), "@id": `${absoluteUrl(canonicalFor(locale, path))}#service`, url: absoluteUrl(canonicalFor(locale, path)), name: translateCopy(data.eyebrow, locale), serviceType: translateCopy(data.eyebrow, locale), description: translateCopy(data.metadata.description, locale), termsOfService: absoluteUrl(pathForLanguage("/algemene-voorwaarden/", locale)) },
            { "@context": "https://schema.org", "@type": "WebPage", "@id": `${absoluteUrl(canonicalFor(locale, path))}#webpage`, url: absoluteUrl(canonicalFor(locale, path)), name: translateCopy(data.metadata.title, locale), description: translateCopy(data.metadata.description, locale), inLanguage: locale === "en" ? "en-US" : "es-ES" },
            faqJsonLd(data.faq.map(item => ({ question: translateCopy(item.question, locale), answer: translateCopy(item.answer, locale) }))),
          ]}
        />
        <SiteShell initialLanguage={locale} premiumNavigation>
          <FocusServicePage locale={locale} data={data} />
        </SiteShell>
      </>
    );
  }

  if (path === "social-ads") return <SocialAdsPage initialLanguage={locale} />;
  if (path === "content-creatie") return <ContentPage initialLanguage={locale} />;
  if (path === "website") return <WebsitePage initialLanguage={locale} />;
  if (path === "privacy") return <PrivacyPage initialLanguage={locale} />;
  if (path === "algemene-voorwaarden") return <TermsPage initialLanguage={locale} />;

  return null;
}
