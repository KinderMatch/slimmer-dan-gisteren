import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { localizedPublicPaths, normalizeLocale, supportedLocales } from "../../i18n";
import { LocalizedRoutePage, localizedMetadata, type LocalizedPagePath } from "../../localized-route";

type LocalePageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

function slugPath(slug?: string[]) {
  return slug?.join("/") ?? "";
}

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    localizedPublicPaths.map((path) => ({
      locale,
      slug: path ? path.split("/") : [],
    })),
  );
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam);
  const path = slugPath(slug);

  if (!locale || !localizedPublicPaths.includes(path as (typeof localizedPublicPaths)[number])) {
    return {};
  }

  return localizedMetadata(locale, path as LocalizedPagePath);
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam);
  const path = slugPath(slug);

  if (!locale || !localizedPublicPaths.includes(path as (typeof localizedPublicPaths)[number])) {
    notFound();
  }

  return <LocalizedRoutePage locale={locale} path={path as LocalizedPagePath} />;
}
