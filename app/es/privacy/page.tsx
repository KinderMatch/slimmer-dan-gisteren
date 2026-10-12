import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("es", "privacy");

export default function SpanishPrivacyPage() {
  return <LocalizedRoutePage locale="es" path="privacy" />;
}
