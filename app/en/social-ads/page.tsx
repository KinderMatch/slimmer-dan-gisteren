import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("en", "social-ads");

export default function EnglishSocialAdsPage() {
  return <LocalizedRoutePage locale="en" path="social-ads" />;
}
