import type { Metadata } from "next";

import { JsonLd } from "./json-ld";
import { languageAlternates } from "./i18n";
import { PremiumHome } from "./premium-home";
import { absoluteUrl, breadcrumbJsonLd, defaultOgImage, faqJsonLd, servicePages, siteName } from "./seo";

export const metadata: Metadata = {
  title: "Slimmer dan Gisteren - GEO, SEO, Google Ads en Social Ads",
  description:
    "Marketingbureau voor ondernemers die GEO, SEO, Google Ads, Social Ads en social media content willen laten samenwerken voor zichtbare groei.",
  alternates: languageAlternates("/"),
  keywords: [
    "marketingbureau",
    "GEO",
    "Generative Engine Optimization",
    "SEO uitbesteden",
    "Google Ads uitbesteden",
    "Social Ads",
    "social media content",
    "Slimmer dan Gisteren",
  ],
  openGraph: {
    title: "Slimmer dan Gisteren - Marketing die helderheid brengt",
    description:
      "GEO, SEO, Google Ads, Social Ads en social media content onder één helder groeisysteem.",
    url: absoluteUrl("/"),
    siteName,
    images: [{ url: absoluteUrl(defaultOgImage), alt: "Slimmer dan Gisteren portfolio" }],
    locale: "nl_NL",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          faqJsonLd([
            {
              question: "Waar helpt Slimmer dan Gisteren mee?",
              answer:
                "Slimmer dan Gisteren helpt met GEO, SEO, Google Ads, Social Ads, tracking, rapportage en social media content.",
            },
            {
              question: "Voor wie is Slimmer dan Gisteren geschikt?",
              answer:
                "Voor ondernemers en organisaties die zichtbaarheid in Google, AI-antwoorden en social campagnes rustiger en meetbaarder willen maken.",
            },
            {
              question: "Hoe kan ik kennismaken?",
              answer:
                "Je kunt een strategiesessie plannen via Calendly, direct contact opnemen via WhatsApp of mailen naar jimmy@slimmerdangisteren.nl.",
            },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Diensten van Slimmer dan Gisteren",
            itemListElement: servicePages.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.name,
              url: absoluteUrl(service.path),
            })),
          },
        ]}
      />
      <PremiumHome />
    </>
  );
}
