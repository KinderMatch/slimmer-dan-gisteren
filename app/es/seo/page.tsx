import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("es", "seo");

export default function SpanishSeoPage() {
  return <LocalizedRoutePage locale="es" path="seo" />;
}
