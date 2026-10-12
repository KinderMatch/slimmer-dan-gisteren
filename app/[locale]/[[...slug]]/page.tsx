import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FocusServicePage } from "../../focus-service-page";
import { geoPage, googleAdsPage, seoPage } from "../../growth-pages-data";
import { localizedPublicPaths, normalizeLocale, pathForLanguage, supportedLocales, type RouteLocale } from "../../i18n";
import { JsonLd } from "../../json-ld";
import { LocalizedServicePage } from "../../localized-service-page";
import { PremiumHome } from "../../premium-home";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, siteName } from "../../seo";
import { SiteShell } from "../../site-content";
import TermsPage from "../../algemene-voorwaarden/page";
import ContentPage from "../../content-creatie/page";
import PrivacyPage from "../../privacy/page";
import SocialAdsPage from "../../social-ads/page";
import WebsitePage from "../../website/page";

type LocalePageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

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
  },
} satisfies Record<RouteLocale, Record<string, string>>;

function slugPath(slug?: string[]) {
  return slug?.join("/") ?? "";
}

function canonicalFor(locale: RouteLocale, path: string) {
  return pathForLanguage(path ? `/${path}/` : "/", locale);
}

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    localizedPublicPaths.map((path) => ({
      locale,
      slug: path ? path.split("/") : undefined,
    })),
  );
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam);
  const path = slugPath(slug);

  if (!locale || !localizedPublicPaths.includes(path as (typeof localizedPublicPaths)[number])) {
    return {};
  }

  const meta = pageMeta[locale];
  const canonical = canonicalFor(locale, path);
  const languages = {
    "nl-NL": path ? `/${path}/` : "/",
    "en-US": pathForLanguage(path ? `/${path}/` : "/", "en"),
    "es-ES": pathForLanguage(path ? `/${path}/` : "/", "es"),
  };

  if (path === "seo") {
    return {
      title: meta.seoTitle,
      description: meta.seoDescription,
      alternates: { canonical, languages },
      openGraph: { title: meta.seoTitle, description: meta.seoDescription, url: absoluteUrl(canonical), siteName, locale: locale === "en" ? "en_US" : "es_ES", type: "website" },
    };
  }

  if (path === "geo") {
    return {
      title: meta.geoTitle,
      description: meta.geoDescription,
      alternates: { canonical, languages },
      openGraph: { title: meta.geoTitle, description: meta.geoDescription, url: absoluteUrl(canonical), siteName, locale: locale === "en" ? "en_US" : "es_ES", type: "website" },
    };
  }

  if (path === "google-ads") {
    return {
      title: meta.adsTitle,
      description: meta.adsDescription,
      alternates: { canonical, languages },
      openGraph: { title: meta.adsTitle, description: meta.adsDescription, url: absoluteUrl(canonical), siteName, locale: locale === "en" ? "en_US" : "es_ES", type: "website" },
    };
  }

  return {
    title: meta.homeTitle,
    description: meta.homeDescription,
    alternates: { canonical, languages },
    openGraph: { title: meta.homeTitle, description: meta.homeDescription, url: absoluteUrl(canonical), siteName, locale: locale === "en" ? "en_US" : "es_ES", type: "website" },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam);
  const path = slugPath(slug);

  if (!locale || !localizedPublicPaths.includes(path as (typeof localizedPublicPaths)[number])) {
    notFound();
  }

  if (!path) {
    return <PremiumHome initialLanguage={locale} />;
  }

  if (path === "seo" || path === "geo" || path === "google-ads") {
    const data = path === "seo" ? seoPage : path === "geo" ? geoPage : googleAdsPage;
    return (
      <>
        <JsonLd
          data={[
            breadcrumbJsonLd([{ name: "Home", path: canonicalFor(locale, "") }, { name: data.eyebrow, path: canonicalFor(locale, path) }]),
            serviceJsonLd(data.slug),
            faqJsonLd(data.faq),
          ]}
        />
        <SiteShell initialLanguage={locale}>
          <LocalizedServicePage language={locale} service={path} />
        </SiteShell>
      </>
    );
  }

  if (path === "social-ads") return <SocialAdsPage />;
  if (path === "content-creatie") return <ContentPage />;
  if (path === "website") return <WebsitePage />;
  if (path === "privacy") return <PrivacyPage />;
  if (path === "algemene-voorwaarden") return <TermsPage />;

  notFound();
}
