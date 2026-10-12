import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("en", "seo");

export default function EnglishSeoPage() {
  return <LocalizedRoutePage locale="en" path="seo" />;
}
