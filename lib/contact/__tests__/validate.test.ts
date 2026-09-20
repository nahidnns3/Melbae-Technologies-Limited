import { describe, expect, it } from "vitest";
import { hasHeaderInjection, normalize, validate } from "../validate";

const valid = {
  name: "Farhana Rahman",
  email: "farhana@example.com",
  organization: "",
  topic: "basha-os",
  message:
    "We manage a 24-flat building in Uttara and want to see how Basha OS handles service charges.",
};

describe("contact validation", () => {
  it("accepts a well-formed inquiry", () => {
    expect(validate(normalize(valid))).toEqual({});
  });

  it("requires name, email, topic and message", () => {
    const errors = validate(normalize({ name: "", email: "", topic: "", message: "" }));
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "topic"]);
  });

  it("rejects malformed email addresses", () => {
    expect(validate(normalize({ ...valid, email: "not-an-email" })).email).toBeDefined();
    expect(validate(normalize({ ...valid, email: "a@b" })).email).toBeDefined();
  });

  it("rejects unknown topics", () => {
    expect(validate(normalize({ ...valid, topic: "press" })).topic).toBeDefined();
  });

  it("enforces message length bounds", () => {
    expect(validate(normalize({ ...valid, message: "Too short" })).message).toBeDefined();
    expect(
      validate(normalize({ ...valid, message: "x".repeat(4001) })).message,
    ).toBeDefined();
  });

  it("trims and normalizes line endings", () => {
    const n = normalize({
      ...valid,
      name: "  Farhana  ",
      message: "line one\r\nline two, with enough length here",
    });
    expect(n.name).toBe("Farhana");
    expect(n.message).toContain("line one\nline two");
  });

  it("detects header injection in single-line fields", () => {
    expect(hasHeaderInjection("Farhana\nBcc: x@y.z")).toBe(true);
    expect(hasHeaderInjection("Farhana")).toBe(false);
  });
});
