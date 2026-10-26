import DutchGuide, { metadata as sourceMetadata } from "../../../seo/technische-seo/page";
import { translateCopy } from "../../../localize-service-tree";
import { languageAlternates, pathForLanguage } from "../../../i18n";
const path = "/seo/technische-seo/";
export const metadata = { ...sourceMetadata, title: translateCopy(sourceMetadata.title as string, "es"), description: translateCopy(sourceMetadata.description as string, "es"), alternates: { ...languageAlternates(path), canonical: pathForLanguage(path, "es") } };
export default function Page() { return <DutchGuide locale="es" />; }
