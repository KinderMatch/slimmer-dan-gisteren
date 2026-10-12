import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("es", "website");

export default function SpanishWebsitePage() {
  return <LocalizedRoutePage locale="es" path="website" />;
}
