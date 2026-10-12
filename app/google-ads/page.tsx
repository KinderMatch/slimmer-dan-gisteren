import type { Metadata } from "next";

import { FocusServicePage } from "../focus-service-page";
import { JsonLd } from "../json-ld";
import { languageAlternates } from "../i18n";
import { googleAdsPage } from "../growth-pages-data";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, siteName } from "../seo";
import { SiteShell } from "../site-content";

export const metadata: Metadata = {
  title: googleAdsPage.metadata.title,
  description: googleAdsPage.metadata.description,
  alternates: languageAlternates(googleAdsPage.slug),
  keywords: googleAdsPage.metadata.keywords,
  openGraph: {
    title: googleAdsPage.metadata.title,
    description: googleAdsPage.metadata.description,
    url: absoluteUrl(googleAdsPage.slug),
    siteName,
    images: [{ url: absoluteUrl("/assets/content-zb.png"), alt: "Google Ads dashboard Slimmer dan Gisteren" }],
    locale: "nl_NL",
    type: "website",
  },
};

export default function GoogleAdsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Google Ads", path: googleAdsPage.slug }]),
          serviceJsonLd(googleAdsPage.slug),
          faqJsonLd(googleAdsPage.faq),
        ]}
      />
      <SiteShell>
        <FocusServicePage data={googleAdsPage} />
      </SiteShell>
    </>
  );
}
