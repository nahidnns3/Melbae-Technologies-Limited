import "server-only";
import type { ContactInput } from "./validate";
import { inquiryTopics } from "./validate";

/**
 * Delivers an inquiry by email through Resend's HTTP API. No SDK: one POST.
 *
 * Returns "unavailable" when delivery is not configured so the UI can tell
 * the visitor honestly instead of showing a false success.
 */
export type SendResult = "sent" | "unavailable" | "error";

export async function sendInquiry(
  input: ContactInput,
  meta: { receivedAt: Date },
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_INBOX_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return "unavailable";

  const topicLabel =
    inquiryTopics.find((t) => t.value === input.topic)?.label ?? input.topic;
  const subject = `[Website] ${topicLabel}: ${input.name}`;

  const lines = [
    `Topic: ${topicLabel}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.organization ? `Organization: ${input.organization}` : null,
    `Received: ${meta.receivedAt.toISOString()}`,
    "",
    input.message,
  ].filter((l): l is string => l !== null);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject,
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("contact: delivery failed", res.status);
      return "error";
    }
    return "sent";
  } catch (err) {
    console.error("contact: delivery threw", err instanceof Error ? err.message : err);
    return "error";
  }
}
