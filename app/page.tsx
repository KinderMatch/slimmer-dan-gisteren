import type { Metadata } from "next";

import { JsonLd } from "./json-ld";
import { PremiumHome } from "./premium-home";
import { absoluteUrl, breadcrumbJsonLd, defaultOgImage, faqJsonLd, servicePages, siteName } from "./seo";

export const metadata: Metadata = {
  title: "Slimmer dan Gisteren - Websites, Advertenties, SEO en Content Creatie",
  description:
    "Creative growth studio voor ondernemers die websites, advertenties, SEO en content creatie willen laten samenwerken voor zichtbare groei.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "marketingbureau",
    "creative growth studio",
    "website laten maken",
    "SEO uitbesteden",
    "advertenties uitbesteden",
    "content creatie",
    "online marketing uitbesteden",
    "Slimmer dan Gisteren",
  ],
  openGraph: {
    title: "Slimmer dan Gisteren - Marketing die helderheid brengt",
    description:
      "Websites, advertenties, SEO en content creatie onder één helder groeisysteem.",
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
                "Slimmer dan Gisteren helpt met websites, websitebeheer, SEO, advertenties, tracking, rapportage, fotografie, videografie en content creatie.",
            },
            {
              question: "Voor wie is Slimmer dan Gisteren geschikt?",
              answer:
                "Voor ondernemers en organisaties die marketing rustiger, meetbaarder en visueler willen maken, zonder losse bureaus voor website, advertenties en content.",
            },
            {
              question: "Hoe kan ik kennismaken?",
              answer:
                "Je kunt een strategiesessie plannen via Calendly, direct contact opnemen via WhatsApp of mailen naar info@slimmerdangisteren.nl.",
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
