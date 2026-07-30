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
    default: "Slimmer dan Gisteren - Websites, Advertenties en Content Creatie",
    template: `%s | ${siteName}`,
  },
  description:
    "Slimmer dan Gisteren helpt ondernemers met websites, advertenties, SEO en content creatie. Marketing die helderheid brengt en groei zichtbaar maakt.",
  keywords: [
    "Slimmer dan Gisteren",
    "website laten maken",
    "websitebeheer",
    "SEO uitbesteden",
    "advertenties uitbesteden",
    "Google Ads uitbesteden",
    "content creatie",
    "videografie",
    "fotografie",
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
    title: "Slimmer dan Gisteren - Websites, Advertenties en Content Creatie",
    description:
      "Premium creative growth studio voor websites, advertenties, SEO en content creatie.",
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
    title: "Slimmer dan Gisteren - Creative Growth Studio",
    description:
      "Websites, advertenties, SEO en content creatie onder één helder groeisysteem.",
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
