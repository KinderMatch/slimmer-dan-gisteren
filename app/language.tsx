"use client";

import { createContext, Fragment, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { pathForLanguage } from "./i18n";

export type Language = "nl" | "en" | "es";

export type LocalizedString = {
  en: string;
  es: string;
  nl: string;
};

const defaultLanguage: Language = "nl";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({
  language: defaultLanguage,
  setLanguage: () => undefined,
});

export function LanguageProvider({ children, initialLanguage = defaultLanguage }: { children: ReactNode; initialLanguage?: Language }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    const pathLanguage = window.location.pathname.match(/^\/(en|es)(?=\/|$)/)?.[1];
    if (pathLanguage === "en" || pathLanguage === "es") {
      setLanguageState(pathLanguage);
      document.documentElement.lang = pathLanguage;
      return;
    }

    // The URL is authoritative: a stored preference must not mix translated
    // navigation with Dutch service content or change its document language.
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (requestedLanguage === "en" || requestedLanguage === "es") {
      window.location.replace(pathForLanguage(window.location.pathname, requestedLanguage));
      return;
    }
    setLanguageState("nl");
    document.documentElement.lang = "nl";
  }, [initialLanguage]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: Language) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem("sdg-language", nextLanguage);
        document.documentElement.lang = nextLanguage;
        window.location.href = pathForLanguage(window.location.pathname, nextLanguage);
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function resolveText(value: LocalizedString | string, language: Language) {
  return typeof value === "string" ? value : value[language];
}

export function Text({ value }: { value: LocalizedString | string }) {
  const { language } = useLanguage();

  return <>{resolveText(value, language)}</>;
}

export function EmphasisText({ value }: { value: LocalizedString | string }) {
  const { language } = useLanguage();
  const text = resolveText(value, language);
  const parts = text.split(/(\[\[.*?\]\])/g).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("[[") && part.endsWith("]]")) {
          return (
            <span className="text-accent" key={`${part}-${index}`}>
              {part.slice(2, -2)}
            </span>
          );
        }

        return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
      })}
    </>
  );
}

export function LanguageToggle() {
  const { language } = useLanguage();
  const pathname = usePathname() || "/";
  const label = {
    en: "Language",
    es: "Idioma",
    nl: "Taalkeuze",
  } satisfies Record<Language, string>;

  return (
    <div className="language-toggle" aria-label={label[language]}>
      {(["nl", "en", "es"] as const).map((option) => (
        <a
          aria-current={language === option ? "page" : undefined}
          href={pathForLanguage(pathname, option)}
          hrefLang={option}
          lang={option}
          key={option}
        >
          {option.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
