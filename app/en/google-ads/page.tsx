import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("en", "google-ads");

export default function EnglishGoogleAdsPage() {
  return <LocalizedRoutePage locale="en" path="google-ads" />;
}
