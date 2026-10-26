import { localizeStructuredData } from "./localize-service-tree";
import type { Language } from "./language";
type JsonLdProps = {
  data: unknown;
  locale?: Language;
};

export function JsonLd({ data, locale = "nl" }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localizeStructuredData(data, locale)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
