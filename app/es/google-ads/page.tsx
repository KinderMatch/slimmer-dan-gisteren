import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("es", "google-ads");

export default function SpanishGoogleAdsPage() {
  return <LocalizedRoutePage locale="es" path="google-ads" />;
}
