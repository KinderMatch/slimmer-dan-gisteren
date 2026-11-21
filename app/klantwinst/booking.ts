export const klantwinstBookingUrl = "https://calendly.com/buitenhuisj004/bmc-sessie";

// Only the actual Calendly iframe may confirm a booking in this page.
export function isBookingConfirmation(message: { origin: string; source: unknown; data: unknown }, frameWindow: unknown) {
  return !!frameWindow && message.source === frameWindow && message.origin === "https://calendly.com"
    && !!message.data && typeof message.data === "object"
    && (message.data as { event?: unknown }).event === "calendly.event_scheduled";
}
