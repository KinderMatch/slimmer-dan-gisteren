import type { Metadata } from "next";

import { PremiumHome } from "./premium-home";

export const metadata: Metadata = {
  title: "Slimmer dan Gisteren - Creative Growth Studio",
  description:
    "Premium creative growth studio voor websites, advertenties en content creatie. Marketing that brings clarity. Growth that becomes visible.",
};

export default function Home() {
  return <PremiumHome />;
}
