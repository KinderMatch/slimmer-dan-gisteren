import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("es", "geo");

export default function SpanishGeoPage() {
  return <LocalizedRoutePage locale="es" path="geo" />;
}
