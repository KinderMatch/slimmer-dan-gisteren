import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("es", "algemene-voorwaarden");

export default function SpanishTermsPage() {
  return <LocalizedRoutePage locale="es" path="algemene-voorwaarden" />;
}
