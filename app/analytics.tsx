"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { consentKey, destination, measurementId, publicPath, readConsent, safeLabel } from "./analytics-policy";

type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [key: `ga-disable-${string}`]: boolean };
let allowed = false;
let configured = false;
let lastPage = "";
const copy = {
  nl: { title: "Cookies toestaan?", body: "We gebruiken Google Analytics voor bezoekers- en klikstatistieken. Jij kiest.", yes: "Ja", no: "Nee", settings: "Cookievoorkeuren", privacy: "Privacybeleid" },
  en: { title: "Allow cookies?", body: "We use Google Analytics for visitor and click statistics. You choose.", yes: "Yes", no: "No", settings: "Cookie preferences", privacy: "Privacy policy" },
  es: { title: "¿Permitir cookies?", body: "Usamos Google Analytics para estadísticas de visitas y clics. Tú decides.", yes: "Sí", no: "No", settings: "Preferencias de cookies", privacy: "Política de privacidad" },
};

function language(path: string) { return path.startsWith("/en/") ? "en" : path.startsWith("/es/") ? "es" : "nl"; }

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || !allowed || !publicPath(location.pathname)) return;
  (window as AnalyticsWindow).gtag?.("event", name, { ...params, page_location: location.origin + location.pathname, page_path: location.pathname, language: language(location.pathname) });
}

function pageView() {
  if (!allowed || !publicPath(location.pathname) || lastPage === location.pathname) return;
  lastPage = location.pathname;
  trackEvent("page_view", { page_title: document.title });
}

function activate() {
  if (!/^G-[A-Z0-9]+$/.test(measurementId) || !["slimmerdangisteren.nl", "www.slimmerdangisteren.nl"].includes(location.hostname)) return;
  const w = window as AnalyticsWindow;
  allowed = true;
  w[`ga-disable-${measurementId}`] = false;
  if (!configured) {
    configured = true;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer!.push(arguments); };
    w.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    w.gtag("js", new Date());
    w.gtag("config", measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 15552000, page_location: location.origin + location.pathname, page_referrer: (() => { try { return new URL(document.referrer).origin; } catch { return ""; } })() });
    const script = document.createElement("script");
    script.id = "sdg-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }
  pageView();
}

function disable() {
  allowed = false;
  (window as AnalyticsWindow)[`ga-disable-${measurementId}`] = true;
  // Reload after withdrawal to remove Google's listeners and queued commands entirely.
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga(?:_|$)/.test(name)) continue;
    for (const domain of ["", location.hostname, ".slimmerdangisteren.nl"]) {
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax; Secure`;
    }
  }
}

export function Analytics() {
  const pathname = usePathname() || "/";
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const lang = language(pathname);
  const text = copy[lang];
  useEffect(() => {
    setReady(true);
    let choice: boolean | null = null;
    try { choice = readConsent(localStorage.getItem(consentKey)); } catch { /* Default: no tracking. */ }
    setOpen(choice === null);
    if (choice === true && publicPath(location.pathname)) activate();
    const storage = (event: StorageEvent) => {
      if (event.key !== consentKey && event.key !== null) return;
      if (readConsent(event.newValue) !== true) { disable(); if (configured) location.reload(); else setOpen(true); }
      else activate();
    };
    const click = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>("a,button,summary,[role=button],input[type=submit],input[type=button]") : null;
      if (!element || element.closest("[data-analytics-ignore]") || element.matches(":disabled,[aria-disabled=true]")) return;
      const href = element.getAttribute("href");
      const link = href ? destination(href, location.origin) : { target: element.tagName.toLowerCase(), method: "" };
      const params = { button_text: safeLabel(element.getAttribute("aria-label") || element.textContent || element.getAttribute("value") || "button"), destination: link.target, placement: element.closest(".contact-dock") ? "contact_dock" : element.closest("nav") ? "navigation" : element.closest("footer") ? "footer" : element.closest("section[id],form[id]")?.id || "content" };
      trackEvent("button_click", params);
      if (link.method) trackEvent("contact_click", { ...params, contact_method: link.method });
    };
    document.addEventListener("click", click, true);
    window.addEventListener("storage", storage);
    return () => { document.removeEventListener("click", click, true); window.removeEventListener("storage", storage); };
  }, []);
  useEffect(() => {
    if (!publicPath(pathname)) { if (configured) { disable(); location.reload(); } return; }
    // Wait for the route's document title to be committed.
    const timer = setTimeout(pageView, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  function choose(value: boolean) {
    try { localStorage.setItem(consentKey, JSON.stringify({ allowed: value, at: Date.now() })); } catch { /* Consent is then session-only. */ }
    setOpen(false);
    if (value) activate();
    else { disable(); if (configured) location.reload(); }
  }
  // Do not display a consent banner until this website's GA4 stream is configured.
  if (!ready || !measurementId || !publicPath(pathname)) return null;
  return <div data-analytics-ignore="true" className="analytics-consent">
    <button className="analytics-settings" type="button" onClick={() => setOpen(true)}>{text.settings}</button>
    {open && <section className="analytics-banner" aria-labelledby="analytics-consent-title" role="region">
      <h2 id="analytics-consent-title">{text.title}</h2><p>{text.body} <a href={`${lang === "nl" ? "" : `/${lang}`}/privacy/`}>{text.privacy}</a>.</p>
      <div><button type="button" onClick={() => choose(false)}>{text.no}</button><button type="button" onClick={() => choose(true)}>{text.yes}</button></div>
    </section>}
  </div>;
}
