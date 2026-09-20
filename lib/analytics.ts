/**
 * Privacy-conscious event tracking.
 *
 * Events are forwarded to Vercel Web Analytics when it is present on the
 * page (production only) and otherwise ignored. No form contents, names or
 * email addresses are ever passed as event properties.
 */
export type SiteEvent =
  | { name: "product_outbound"; product: string; location: string }
  | { name: "cta_click"; cta: string; location: string }
  | { name: "contact_start"; topic: string }
  | {
      name: "contact_submit";
      topic: string;
      outcome: "sent" | "invalid" | "unavailable" | "error";
    };

type TrackFn = (name: string, props?: Record<string, string | number | boolean>) => void;

declare global {
  interface Window {
    va?: (
      event: "event",
      payload: { name: string; data?: Record<string, string | number | boolean> },
    ) => void;
  }
}

export function track(event: SiteEvent) {
  if (typeof window === "undefined") return;
  const { name, ...data } = event;
  const va = window.va;
  if (typeof va === "function") {
    va("event", { name, data });
  }
}

export const noopTrack: TrackFn = () => {};
