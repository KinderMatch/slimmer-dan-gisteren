import { LocalizedRoutePage, localizedMetadata } from "../../localized-route";

export const metadata = localizedMetadata("en", "privacy");

export default function EnglishPrivacyPage() {
  return <LocalizedRoutePage locale="en" path="privacy" />;
}
