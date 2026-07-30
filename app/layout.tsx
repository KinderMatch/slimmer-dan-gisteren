import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slimmerdangisteren.nl"),
  title: {
    default: "Slimmer dan Gisteren",
    template: "%s",
  },
  description:
    "Premium creative growth studio voor websites, advertenties en content creatie die helderheid brengt en groei zichtbaar maakt.",
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "Slimmer dan Gisteren",
    description:
      "Marketing that brings clarity. Growth that becomes visible.",
    url: "https://slimmerdangisteren.nl",
    siteName: "Slimmer dan Gisteren",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
