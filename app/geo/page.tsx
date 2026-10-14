import type { Metadata } from "next";

import { FocusServicePage } from "../focus-service-page";
import { JsonLd } from "../json-ld";
import { languageAlternates } from "../i18n";
import { geoPage } from "../growth-pages-data";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, siteName } from "../seo";
import { SiteShell } from "../site-content";

export const metadata: Metadata = {
  title: geoPage.metadata.title,
  description: geoPage.metadata.description,
  alternates: languageAlternates(geoPage.slug),
  keywords: geoPage.metadata.keywords,
  openGraph: {
    title: geoPage.metadata.title,
    description: geoPage.metadata.description,
    url: absoluteUrl(geoPage.slug),
    siteName,
    images: [{ url: absoluteUrl("/assets/optimized/content-zb.jpg"), alt: "GEO dashboard Slimmer dan Gisteren" }],
    locale: "nl_NL",
    type: "website",
  },
};

export default function GeoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "GEO", path: geoPage.slug }]),
          serviceJsonLd(geoPage.slug),
          faqJsonLd(geoPage.faq),
        ]}
      />
      <SiteShell premiumNavigation>
        <FocusServicePage data={geoPage} />
      </SiteShell>
    </>
  );
}
