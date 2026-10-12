import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("en", "website");

export default function EnglishWebsitePage() {
  return <LocalizedRoutePage locale="en" path="website" />;
}
