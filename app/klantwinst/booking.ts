export const klantwinstBookingUrl = "https://calendly.com/buitenhuisj004/bmc-sessie";

// Keep contact prefill in the URL too: the fallback must carry the same details
// as the JavaScript embed, including when Calendly opens on a phone.
export function klantwinstBookingLink(name: string, email: string) {
  const url = new URL(klantwinstBookingUrl);
  url.searchParams.set("name", name.trim());
  url.searchParams.set("email", email.trim());
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("primary_color", "25608a");
  return url.toString().replace(/\+/g, "%20");
}

// Only the actual Calendly iframe may confirm a booking in this page.
export function isCalendlyMessage(message: { origin: string; source: unknown; data: unknown }, frameWindow: unknown) {
  return !!frameWindow && message.source === frameWindow && message.origin === "https://calendly.com"
    && !!message.data && typeof message.data === "object"
    && typeof (message.data as { event?: unknown }).event === "string"
    && (message.data as { event: string }).event.startsWith("calendly.");
}

export function isBookingConfirmation(message: { origin: string; source: unknown; data: unknown }, frameWindow: unknown) {
  return isCalendlyMessage(message, frameWindow)
    && (message.data as { event: string }).event === "calendly.event_scheduled";
}

// Open during the user's click, before awaiting storage: browsers otherwise
// block the new tab. Only navigate to Calendly once the application is saved.
export function prepareBookingTab(browser: Pick<Window, "open">) {
  let tab: Window | null = null;
  try {
    tab = browser.open("about:blank", "_blank");
    if (tab) {
      tab.opener = null;
      tab.document.title = "Je aanvraag wordt opgeslagen | Slimmer dan Gisteren";
      tab.document.body.textContent = "Je aanvraag wordt opgeslagen. Daarna opent hier de planner voor je gratis Klantwinst-check.";
    }
  } catch { /* The original page always provides a working booking link. */ }
  return {
    complete(name: string, email: string) {
      try { if (tab && !tab.closed) tab.location.replace(klantwinstBookingLink(name, email)); } catch { /* Manual link remains available. */ }
    },
    close() { try { if (tab && !tab.closed) tab.close(); } catch { /* Already closed. */ } },
  };
}
