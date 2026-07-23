import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slimmerdangisteren.nl"),
  title: {
    default: "Slimmer dan Gisteren",
    template: "%s",
  },
  description:
    "Websitebeheer, advertenties en content creatie voor ondernemers die slimmer willen groeien.",
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "Slimmer dan Gisteren",
    description:
      "Websitebeheer, advertenties en content creatie voor ondernemers die slimmer willen groeien.",
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
      <body className={`${sora.variable} antialiased`}>{children}</body>
    </html>
  );
}
