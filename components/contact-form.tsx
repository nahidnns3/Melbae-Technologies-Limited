"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { submitInquiry, type ContactState } from "@/app/contact/actions";
import { track } from "@/lib/analytics";
import {
  inquiryTopics,
  isInquiryTopic,
  limits,
  validate,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact/validate";
import { Button } from "./button";

const empty: ContactInput = {
  name: "",
  email: "",
  organization: "",
  topic: "",
  message: "",
};

export function ContactForm({
  initialTopic,
  contactEmail,
}: {
  initialTopic?: string;
  contactEmail: string;
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitInquiry, {
    status: "idle",
  });
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const [started, setStarted] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const topic = initialTopic && isInquiryTopic(initialTopic) ? initialTopic : "";
  const values: ContactInput =
    state.status === "invalid" ||
    state.status === "unavailable" ||
    state.status === "error" ||
    state.status === "rejected"
      ? state.values
      : { ...empty, topic };
  const errors: ContactErrors =
    state.status === "invalid" ? { ...state.errors, ...clientErrors } : clientErrors;

  useEffect(() => {
    if (state.status === "idle") return;
    statusRef.current?.focus();
    if (state.status === "sent")
      track({ name: "contact_submit", topic: state.topic, outcome: "sent" });
    else if (state.status === "invalid")
      track({ name: "contact_submit", topic: values.topic, outcome: "invalid" });
    else if (state.status === "unavailable")
      track({ name: "contact_submit", topic: values.topic, outcome: "unavailable" });
    else if (state.status === "error")
      track({ name: "contact_submit", topic: values.topic, outcome: "error" });
    // values.topic is derived from state; state is the only real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-sm border border-line bg-paper-elevated p-6 outline-none"
      >
        <h2 className="text-h4">Thank you. Your message has reached us.</h2>
        <p className="mt-2 text-body text-ink-secondary">
          We read every inquiry and reply from a real mailbox. If your message is about
          Basha OS and you want to try it in the meantime, it is open at{" "}
          <a
            className="link"
            href="https://www.bashaos.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            bashaos.com
          </a>
          .
        </p>
      </div>
    );
  }

  const field = (name: keyof ContactInput) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    defaultValue: values[name],
    onFocus: () => {
      if (!started) {
        setStarted(true);
        track({ name: "contact_start", topic: values.topic || "unset" });
      }
    },
  });

  return (
    <form
      action={action}
      noValidate
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget);
        const input: ContactInput = {
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          organization: String(data.get("organization") ?? "").trim(),
          topic: String(data.get("topic") ?? ""),
          message: String(data.get("message") ?? "").trim(),
        };
        const found = validate(input);
        setClientErrors(found);
        if (Object.keys(found).length > 0) {
          e.preventDefault();
          const first = Object.keys(found)[0] as keyof ContactInput;
          document.getElementById(`${id}-${first}`)?.focus();
        }
      }}
      className="space-y-6"
    >
      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {state.status === "unavailable" ? (
          <Notice tone="warning" title="The form is not accepting messages yet.">
            Message delivery has not been switched on for this site.{" "}
            {contactEmail ? (
              <>
                Please email us directly at{" "}
                <a className="link" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </>
            ) : (
              "Please try again later."
            )}
          </Notice>
        ) : null}
        {state.status === "error" ? (
          <Notice tone="error" title="We couldn't send your message.">
            Something went wrong on our side. Your text is still in the form; please try
            again in a moment
            {contactEmail ? (
              <>
                {" "}
                or email{" "}
                <a className="link" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </>
            ) : null}
            .
          </Notice>
        ) : null}
        {state.status === "rejected" ? (
          <Notice tone="error" title="That submission was not accepted.">
            Please take a moment to fill in the form and try again.
          </Notice>
        ) : null}
        {state.status === "invalid" ? (
          <Notice tone="error" title="Please check the highlighted fields.">
            A few details are missing or don&rsquo;t look right.
          </Notice>
        ) : null}
      </div>

      <input type="hidden" name="startedAt" value={startedAt} />
      {/* Honeypot: hidden from people, attractive to bots. */}
      <div
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Your name" error={errors.name} id={`${id}-name`}>
        <input
          {...field("name")}
          type="text"
          autoComplete="name"
          maxLength={limits.name}
          required
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field
        label="Email address"
        error={errors.email}
        id={`${id}-email`}
        hint="We reply by email."
      >
        <input
          {...field("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={limits.email}
          required
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field
        label="Organization"
        error={errors.organization}
        id={`${id}-organization`}
        hint="Optional."
      >
        <input
          {...field("organization")}
          type="text"
          autoComplete="organization"
          maxLength={limits.organization}
          className={inputClass(!!errors.organization)}
        />
      </Field>

      <Field label="What is this about?" error={errors.topic} id={`${id}-topic`}>
        <select {...field("topic")} required className={inputClass(!!errors.topic)}>
          <option value="">Choose one</option>
          {inquiryTopics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message"
        error={errors.message}
        id={`${id}-message`}
        hint="A few sentences about your building, organization or idea is plenty."
      >
        <textarea
          {...field("message")}
          rows={6}
          maxLength={limits.message}
          required
          className={inputClass(!!errors.message) + " min-h-40 resize-y"}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p className="font-display text-caption text-ink-muted">
          We use what you send only to reply to you. See our{" "}
          <a className="link" href="/privacy">
            privacy notice
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return [
    "block w-full rounded-xs border bg-paper-elevated px-3.5 py-3 font-display text-body text-ink shadow-none transition-colors duration-(--dur-micro) placeholder:text-ink-muted focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    invalid ? "border-error" : "border-line-strong",
  ].join(" ");
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-display text-small font-semibold text-ink"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 font-display text-caption text-error">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 font-display text-caption text-ink-muted">{hint}</p>
      ) : null}
    </div>
  );
}

function Notice({
  tone,
  title,
  children,
}: {
  tone: "warning" | "error";
  title: string;
  children: React.ReactNode;
}) {
  const border = tone === "error" ? "border-error" : "border-warning";
  return (
    <div
      role="alert"
      className={`mb-2 rounded-xs border-l-4 ${border} bg-paper-elevated px-4 py-3`}
    >
      <p className="font-display text-small font-semibold text-ink">{title}</p>
      <p className="mt-1 font-display text-caption text-ink-secondary">{children}</p>
    </div>
  );
}
