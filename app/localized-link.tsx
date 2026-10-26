"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { pathForLanguage } from "./i18n";
import { useLanguage } from "./language";

export function LocalizedLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const { language } = useLanguage();

  return <Link prefetch={false} href={pathForLanguage(href, language)} {...props} />;
}
