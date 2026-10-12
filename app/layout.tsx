import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "./json-ld";
import { absoluteUrl, defaultOgImage, organizationJsonLd, siteName, siteUrl, websiteJsonLd } from "./seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slimmerdangisteren.nl"),
  title: {
    default: "Slimmer dan Gisteren - SEO, GEO, Google Ads en Social Ads",
    template: `%s | ${siteName}`,
  },
  description:
    "Slimmer dan Gisteren is een marketingbureau voor SEO, GEO, Google Ads en Social Ads. Voor betere vindbaarheid, sterkere campagnes en meer aanvragen.",
  keywords: [
    "Slimmer dan Gisteren",
    "GEO",
    "Generative Engine Optimization",
    "SEO uitbesteden",
    "Google Ads uitbesteden",
    "Social Ads",
    "social media content",
    "creative growth studio",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "Slimmer dan Gisteren - SEO, GEO, Google Ads en Social Ads",
    description:
      "Marketingbureau voor betere vindbaarheid in Google, AI-antwoorden en betaalde campagnes.",
    url: siteUrl,
    siteName,
    images: [
      {
        url: absoluteUrl(defaultOgImage),
        alt: "Slimmer dan Gisteren portfolio case",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slimmer dan Gisteren - SEO, GEO, Google Ads en Social Ads",
    description:
      "Marketingbureau voor SEO, GEO, Google Ads, Social Ads en social media content.",
    images: [absoluteUrl(defaultOgImage)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} antialiased`}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
