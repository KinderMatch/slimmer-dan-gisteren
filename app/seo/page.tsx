import type { Metadata } from "next";

import { FocusServicePage } from "../focus-service-page";
import { JsonLd } from "../json-ld";
import { languageAlternates } from "../i18n";
import { seoPage } from "../growth-pages-data";
import { absoluteUrl, breadcrumbJsonLd, calendlyUrl, faqJsonLd, serviceJsonLd, siteName, siteUrl } from "../seo";
import { SiteShell } from "../site-content";

export const metadata: Metadata = {
  title: seoPage.metadata.title,
  description: seoPage.metadata.description,
  alternates: languageAlternates(seoPage.slug),
  keywords: seoPage.metadata.keywords,
  openGraph: {
    title: `${seoPage.metadata.title} | ${siteName}`,
    description: seoPage.metadata.description,
    url: absoluteUrl(seoPage.slug),
    siteName,
    images: [{ url: absoluteUrl("/assets/optimized/content-zb.jpg"), alt: "SEO dashboard Slimmer dan Gisteren" }],
    locale: "nl_NL",
    type: "website",
  },
};

function seoMarketingbureauPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(seoPage.slug)}#webpage`,
    url: absoluteUrl(seoPage.slug),
    name: seoPage.metadata.title,
    description: seoPage.metadata.description,
    inLanguage: "nl-NL",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: [
      { "@type": "Thing", name: "SEO marketingbureau" },
      { "@type": "Thing", name: "SEO marketing" },
      { "@type": "Thing", name: "Zoekmachine optimalisatie" },
      { "@type": "Thing", name: "Technische SEO" },
      { "@type": "Thing", name: "SEO-content" },
      { "@type": "Thing", name: "Lokale SEO" },
      { "@type": "Thing", name: "Online vindbaarheid" },
    ],
    mentions: seoPage.metadata.keywords.map((keyword) => ({
      "@type": "Thing",
      name: keyword,
    })),
    mainEntity: {
      "@id": `${absoluteUrl(seoPage.slug)}#service`,
    },
    potentialAction: {
      "@type": "ContactAction",
      name: "Vraag een gratis SEO-scan aan",
      target: calendlyUrl,
    },
  };
}

export default function SeoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "SEO", path: seoPage.slug }]),
          serviceJsonLd(seoPage.slug),
          seoMarketingbureauPageJsonLd(),
          faqJsonLd(seoPage.faq),
        ]}
      />
      <SiteShell premiumNavigation>
        <FocusServicePage data={seoPage} />
      </SiteShell>
    </>
  );
}
