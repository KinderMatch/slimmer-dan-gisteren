// Only fixed campaign codes are accepted; never forward arbitrary query strings or form input.
export type HookContext = { kw_hook: string; kw_round: string; kw_variant: string; kw_visit_day: string; kw_visit_hour: string; kw_visit_weekday: string };
export function dutchTimeParts(at: number) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23", weekday: "long" }).formatToParts(new Date(at));
  const get = (key: string) => parts.find(part => part.type === key)?.value || "";
  return { day: `${get("year")}-${get("month")}-${get("day")}`, hour: get("hour"), weekday: get("weekday").toLowerCase() };
}
export function hookContext(search: string, at: number): HookContext | null {
  const p = new URLSearchParams(search);
  const content = p.get("utm_content") || "";
  const match = /^h(0[1-9]|1[0-2])_m01_cta01$/.exec(content);
  if (!match || p.getAll("utm_content").length !== 1 || p.getAll("utm_campaign").length !== 1
    || p.get("utm_source") !== "instagram" || p.get("utm_medium") !== "paid_social") return null;
  const round = Number(match[1]) <= 6 ? "1" : "2";
  if (p.get("utm_campaign") !== `klantwinst_hooktest_r${round}`) return null;
  const time = dutchTimeParts(at);
  return { kw_hook: `H${match[1]}`, kw_round: round, kw_variant: content, kw_visit_day: time.day, kw_visit_hour: time.hour, kw_visit_weekday: time.weekday };
}
export function requestContext(context: HookContext | null, at: number): Record<string, string> {
  if (!context) return {};
  const time = dutchTimeParts(at);
  return { ...context, kw_request_day: time.day, kw_request_hour: time.hour, kw_request_weekday: time.weekday };
}
