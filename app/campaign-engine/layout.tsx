import type { Metadata } from "next";
import type { ReactNode } from "react";

// This is an internal administration surface, not a public search landing page.
export const metadata: Metadata = {
  title: "Campagnebeheer",
  robots: { index: false, follow: false },
  alternates: { canonical: "/campaign-engine/" },
};

export default function CampaignEngineLayout({ children }: { children: ReactNode }) {
  return children;
}
