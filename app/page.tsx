import type { Language } from "./language";
import type { Metadata } from "next";

import { JsonLd } from "./json-ld";
import { languageAlternates } from "./i18n";
import { PremiumHome } from "./premium-home";
import { absoluteUrl, breadcrumbJsonLd, defaultOgImage, primaryServicePages, siteName } from "./seo";

export const homeTitle = "SEO, GEO, Google Ads en Social Ads";

export const metadata: Metadata = {
  title: { absolute: `${homeTitle} | ${siteName}` },
  description:
    "Marketingbureau voor SEO, GEO, Google Ads en Social Ads. Werk direct met Jimmy aan betere vindbaarheid, sterkere campagnes en meer aanvragen.",
  alternates: languageAlternates("/"),
  keywords: [
    "marketingbureau",
    "GEO",
    "Generative Engine Optimization",
    "SEO uitbesteden",
    "Google Ads uitbesteden",
    "Social Ads",
    "Google Ads bureau",
    "SEO marketingbureau",
    "Slimmer dan Gisteren",
  ],
  openGraph: {
    title: "Slimmer dan Gisteren - SEO, GEO, Google Ads en Social Ads",
    description:
      "Marketingbureau voor bedrijven die beter vindbaar willen worden in Google, AI-antwoorden en betaalde campagnes.",
    url: absoluteUrl("/"),
    siteName,
    images: [{ url: absoluteUrl(defaultOgImage), alt: "Slimmer dan Gisteren portfolio" }],
    locale: "nl_NL",
    type: "website",
  },
};

export default function Home({ initialLanguage = "nl" }: { initialLanguage?: Language } = {}) {
  return (
    <>
      <JsonLd locale={initialLanguage}
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Diensten van Slimmer dan Gisteren",
            itemListElement: primaryServicePages.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.name,
              url: absoluteUrl(service.path),
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            name: ["GEO", "SEO", "Google Ads", "Social Ads"],
            url: [
              absoluteUrl("/geo/"),
              absoluteUrl("/seo/"),
              absoluteUrl("/google-ads/"),
              absoluteUrl("/social-ads/"),
            ],
          },
        ]}
      />
      <PremiumHome initialLanguage={initialLanguage} />
    </>
  );
}
