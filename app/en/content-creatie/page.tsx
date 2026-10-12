import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("en", "content-creatie");

export default function EnglishContentPage() {
  return <LocalizedRoutePage locale="en" path="content-creatie" />;
}
