import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics: cookieless, no cross-site tracking, aggregated page
 * views plus the handful of custom events defined in lib/analytics.ts.
 * Rendered in production only.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return <VercelAnalytics />;
}
