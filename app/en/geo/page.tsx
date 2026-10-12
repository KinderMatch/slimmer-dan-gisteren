import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("en", "geo");

export default function EnglishGeoPage() {
  return <LocalizedRoutePage locale="en" path="geo" />;
}
