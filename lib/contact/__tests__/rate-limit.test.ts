import { describe, expect, it } from "vitest";
import { isRateLimited } from "../rate-limit";

describe("rate limit", () => {
  it("allows five submissions in a window and blocks the sixth", () => {
    const key = "test-" + Math.random();
    const now = 1_000_000;
    for (let i = 0; i < 5; i++) expect(isRateLimited(key, now + i)).toBe(false);
    expect(isRateLimited(key, now + 10)).toBe(true);
  });

  it("resets after the window passes", () => {
    const key = "test-" + Math.random();
    const now = 1_000_000;
    for (let i = 0; i < 5; i++) isRateLimited(key, now);
    expect(isRateLimited(key, now + 11 * 60 * 1000)).toBe(false);
  });
});
