"use client";

import { createContext, Fragment, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  useEffect(() => {
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (requestedLanguage === "en" || requestedLanguage === "nl" || requestedLanguage === "es") {
      setLanguageState(requestedLanguage);
      window.localStorage.setItem("sdg-language", requestedLanguage);
      document.documentElement.lang = requestedLanguage;
      return;
    }

    const savedLanguage = window.localStorage.getItem("sdg-language");
    if (savedLanguage === "en" || savedLanguage === "nl" || savedLanguage === "es") {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: Language) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem("sdg-language", nextLanguage);
        document.documentElement.lang = nextLanguage;
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
  const { language, setLanguage } = useLanguage();
  const label = {
    en: "Language",
    es: "Idioma",
    nl: "Taalkeuze",
  } satisfies Record<Language, string>;

  return (
    <div className="language-toggle" aria-label={label[language]}>
      {(["nl", "en", "es"] as const).map((option) => (
        <button
          aria-pressed={language === option}
          key={option}
          onClick={() => setLanguage(option)}
          type="button"
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
