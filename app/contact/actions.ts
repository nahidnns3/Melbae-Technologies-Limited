"use server";

import { headers } from "next/headers";
import { isRateLimited } from "@/lib/contact/rate-limit";
import { sendInquiry } from "@/lib/contact/send";
import {
  hasHeaderInjection,
  normalize,
  validate,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact/validate";

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: ContactErrors; values: ContactInput }
  | { status: "sent"; topic: string }
  | { status: "unavailable"; values: ContactInput }
  | { status: "error"; values: ContactInput }
  | { status: "rejected"; values: ContactInput };

const MIN_FILL_MS = 3000;

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = normalize({
    name: formData.get("name"),
    email: formData.get("email"),
    organization: formData.get("organization"),
    topic: formData.get("topic"),
    message: formData.get("message"),
  });

  // Honeypot: real users never see or fill this field.
  const honey = formData.get("website");
  if (typeof honey === "string" && honey.trim() !== "")
    return { status: "rejected", values };

  // Minimum fill time: forms submitted within a few seconds of render are bots.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "rejected", values };
  }

  const errors = validate(values);
  if (hasHeaderInjection(values.name) || hasHeaderInjection(values.email)) {
    errors.name = errors.name ?? "Please remove line breaks from this field.";
  }
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) return { status: "rejected", values };

  const result = await sendInquiry(values, { receivedAt: new Date() });
  if (result === "sent") return { status: "sent", topic: values.topic };
  if (result === "unavailable") return { status: "unavailable", values };
  return { status: "error", values };
}
