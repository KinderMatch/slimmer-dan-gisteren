export const siteUrl = "https://slimmerdangisteren.nl";
export const siteName = "Slimmer dan Gisteren";
export const contactEmail = "jimmy@slimmerdangisteren.nl";
export const contactPhone = "+31610175027";
export const calendlyUrl = "https://calendly.com/buitenhuisj004/bmc-sessie";

export const defaultOgImage = "/assets/content-zb.png";

export const servicePages = [
  {
    path: "/website/",
    name: "Website laten maken, websitebeheer en SEO",
    description:
      "Websites laten maken, beheren en beter vindbaar maken met SEO, techniek, contentstructuur, tracking en conversiegericht websitebeheer.",
    keywords: [
      "website laten maken",
      "websitebeheer uitbesteden",
      "SEO uitbesteden",
      "vindbaarheid website verbeteren",
      "website optimalisatie",
    ],
  },
  {
    path: "/advertenties/",
    name: "Advertenties en campagnebeheer",
    description:
      "Advertentiebeheer voor campagnes met strategie, tracking, landingspagina's, optimalisatie en maandelijkse rapportage.",
    keywords: [
      "advertenties uitbesteden",
      "advertentiebeheer",
      "Google Ads uitbesteden",
      "online adverteren",
      "campagne optimalisatie",
    ],
  },
  {
    path: "/content-creatie/",
    name: "Content creatie, fotografie en videografie",
    description:
      "Content creatie met fotografie, videografie, social posts, reiscontent, eventvideo en artiestencontent voor zichtbaarheid en merkwaarde.",
    keywords: [
      "content creatie",
      "videografie",
      "fotografie",
      "social content",
      "event video",
      "reiscontent",
      "artiestencontent",
    ],
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    image: absoluteUrl(defaultOgImage),
    logo: absoluteUrl("/assets/logo.png"),
    email: contactEmail,
    telephone: contactPhone,
    areaServed: [
      {
        "@type": "Country",
        name: "Nederland",
      },
      {
        "@type": "AdministrativeArea",
        name: "Noord-Brabant",
      },
      {
        "@type": "AdministrativeArea",
        name: "Limburg",
      },
    ],
    priceRange: "$$",
    description:
      "Slimmer dan Gisteren is een creative growth studio voor websites, advertenties en content creatie. Marketing die helderheid brengt en groei zichtbaar maakt.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        telephone: contactPhone,
        availableLanguage: ["nl", "en", "es"],
        url: calendlyUrl,
      },
    ],
    knowsAbout: [
      "Website laten maken",
      "Websitebeheer",
      "SEO",
      "Advertentiebeheer",
      "Google Ads",
      "Content creatie",
      "Fotografie",
      "Videografie",
      "Conversietracking",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    inLanguage: "nl-NL",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "ContactAction",
      target: calendlyUrl,
      name: "Plan een strategiesessie",
    },
  };
}

export function serviceJsonLd(path: (typeof servicePages)[number]["path"]) {
  const service = servicePages.find((item) => item.path === path);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(service.path)}#service`,
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    serviceType: service.name,
    termsOfService: absoluteUrl(service.path),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: calendlyUrl,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
      },
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: Array<{ answer: string; question: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
