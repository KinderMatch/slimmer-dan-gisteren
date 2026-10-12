import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("en", "algemene-voorwaarden");

export default function EnglishTermsPage() {
  return <LocalizedRoutePage locale="en" path="algemene-voorwaarden" />;
}
