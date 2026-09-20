/**
 * Contact form validation shared by the client (for immediate feedback) and
 * the server action (as the authority). No external schema library: the
 * form has five fields and the rules are simple enough to state directly.
 */

export const inquiryTopics = [
  { value: "basha-os", label: "Basha OS" },
  { value: "developer-partnership", label: "Real-estate or developer partnership" },
  { value: "business-partnership", label: "Business partnership" },
  { value: "careers", label: "Working at Melbae" },
  { value: "general", label: "General inquiry" },
] as const;

export type InquiryTopic = (typeof inquiryTopics)[number]["value"];

export interface ContactInput {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const limits = {
  name: 120,
  email: 254,
  organization: 160,
  message: 4000,
  messageMin: 20,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isInquiryTopic(value: string): value is InquiryTopic {
  return inquiryTopics.some((t) => t.value === value);
}

export function normalize(
  input: Partial<Record<keyof ContactInput, unknown>>,
): ContactInput {
  const str = (v: unknown) =>
    typeof v === "string" ? v.trim().replace(/\r\n/g, "\n") : "";
  return {
    name: str(input.name),
    email: str(input.email),
    organization: str(input.organization),
    topic: str(input.topic),
    message: str(input.message),
  };
}

export function validate(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "Please tell us your name.";
  else if (input.name.length > limits.name) errors.name = "That name is too long.";

  if (!input.email) errors.email = "Please enter an email address so we can reply.";
  else if (input.email.length > limits.email || !emailPattern.test(input.email))
    errors.email = "That email address doesn't look right.";

  if (input.organization.length > limits.organization)
    errors.organization = "That organization name is too long.";

  if (!isInquiryTopic(input.topic))
    errors.topic = "Please choose what your message is about.";

  if (!input.message) errors.message = "Please write a message.";
  else if (input.message.length < limits.messageMin)
    errors.message =
      "A little more detail helps us route your message to the right person.";
  else if (input.message.length > limits.message)
    errors.message = "Please keep your message under 4,000 characters.";

  return errors;
}

/** True when the value contains header-injection characters. */
export function hasHeaderInjection(value: string): boolean {
  return /[\r\n]/.test(value);
}
