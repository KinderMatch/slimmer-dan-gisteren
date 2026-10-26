import DutchGuide, { metadata as sourceMetadata } from "../../../seo/zoekwoordenonderzoek/page";
import { translateCopy } from "../../../localize-service-tree";
import { languageAlternates, pathForLanguage } from "../../../i18n";
const path = "/seo/zoekwoordenonderzoek/";
export const metadata = { ...sourceMetadata, title: translateCopy(sourceMetadata.title as string, "en"), description: translateCopy(sourceMetadata.description as string, "en"), alternates: { ...languageAlternates(path), canonical: pathForLanguage(path, "en") } };
export default function Page() { return <DutchGuide locale="en" />; }
