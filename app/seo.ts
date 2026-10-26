export const siteUrl = "https://slimmerdangisteren.nl";
export const siteName = "Slimmer dan Gisteren";
export const contactEmail = "jimmy@slimmerdangisteren.nl";
export const contactPhone = "+31610175027";
export const calendlyUrl = "https://calendly.com/buitenhuisj004/bmc-sessie";

export const defaultOgImage = "/assets/optimized/content-zb.jpg";

export const servicePages = [
  {
    path: "/geo/",
    name: "GEO bureau voor AI-zichtbaarheid",
    description:
      "Generative Engine Optimization voor betere zichtbaarheid in AI-antwoorden van ChatGPT, Gemini, Perplexity en Google AI Overviews.",
    keywords: [
      "GEO",
      "Generative Engine Optimization",
      "AI SEO",
      "ChatGPT zichtbaarheid",
      "AI Overviews",
    ],
  },
  {
    path: "/seo/",
    name: "SEO marketingbureau voor betere vindbaarheid",
    description:
      "SEO marketingbureau voor bedrijven die beter vindbaar willen worden in Google met zoekmachine optimalisatie, technische SEO, zoekwoordenonderzoek, SEO-content, lokale SEO, autoriteit en conversiegerichte landingspagina's.",
    keywords: [
      "SEO marketingbureau",
      "SEO bureau",
      "SEO uitbesteden",
      "SEO scan",
      "zoekmachine optimalisatie",
      "online vindbaarheid",
      "lokale SEO",
      "technische SEO",
      "SEO content",
      "linkbuilding",
    ],
  },
  {
    path: "/google-ads/",
    name: "Google Ads bureau voor leads en omzet",
    description:
      "Google Ads beheer voor Search, Shopping, Performance Max, YouTube en remarketingcampagnes gericht op leads, omzet en ROAS.",
    keywords: [
      "Google Ads bureau",
      "Google Ads uitbesteden",
      "Performance Max",
      "Shopping campagnes",
      "ROAS optimalisatie",
    ],
  },
  {
    path: "/social-ads/",
    name: "Social Ads en campagnebeheer",
    description:
      "Social Ads beheer voor Meta, LinkedIn, retargeting, leadgeneratie, creative testing, tracking en maandelijkse optimalisatie.",
    keywords: [
      "Social Ads bureau",
      "Meta Ads uitbesteden",
      "LinkedIn Ads",
      "social advertising",
      "social ads uitbesteden",
    ],
  },
  {
    path: "/content-creatie/",
    name: "Social media content creatie",
    description:
      "Social media content met fotografie, videografie, social posts en formats voor zichtbaarheid en merkwaarde.",
    keywords: [
      "social content",
      "social media content",
      "content creatie",
      "videografie",
      "fotografie",
    ],
  },
  {
    path: "/website/",
    name: "Website laten maken en websitebeheer",
    description:
      "Websites laten maken, beheren en optimaliseren als rustig fundament voor SEO, campagnes, tracking en conversie.",
    keywords: [
      "website laten maken",
      "websitebeheer uitbesteden",
      "website optimalisatie",
      "website laten beheren",
    ],
  },
] as const;

export const primaryServicePages = servicePages.filter((service) =>
  ["/geo/", "/seo/", "/google-ads/", "/social-ads/"].includes(service.path),
);

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
    ],
    priceRange: "$$",
    description:
      "Slimmer dan Gisteren is een marketingbureau voor GEO, SEO, Google Ads en Social Ads. We helpen bedrijven beter vindbaar worden in Google en AI-antwoorden, campagnes verbeteren en meer aanvragen krijgen.",
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
      "GEO bureau",
      "Generative Engine Optimization",
      "AI zichtbaarheid",
      "AI Overviews",
      "ChatGPT zichtbaarheid",
      "SEO marketingbureau",
      "SEO",
      "Zoekmachine optimalisatie",
      "Online vindbaarheid",
      "Lokale SEO",
      "Google Ads",
      "Google Ads bureau",
      "Performance Max",
      "Google Shopping",
      "Social Ads",
      "Meta Ads",
      "LinkedIn Ads",
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
    areaServed: path === "/seo/"
      ? [{ "@type": "Country", name: "Nederland" }, { "@type": "City", name: "Amsterdam" }]
      : { "@type": "Country", name: "Nederland" },
    serviceType: service.name,
    termsOfService: absoluteUrl("/algemene-voorwaarden/"),
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
