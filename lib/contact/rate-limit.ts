/**
 * Best-effort, per-instance rate limiting for the contact form.
 *
 * Serverless instances do not share memory, so this is a first line of
 * defence against bursts from a single client, not a global quota. Combined
 * with the honeypot, the minimum fill time and the provider's own limits it
 * is proportionate for a corporate contact form.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    // Prevent unbounded growth on a long-lived instance.
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}
