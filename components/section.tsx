import type { ReactNode } from "react";

/**
 * SectionIntro: eyebrow, heading and optional lead, used to open every
 * top-level section so the page rhythm stays consistent.
 */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  tone = "paper",
  align = "left",
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  tone?: "paper" | "ink" | "basha";
  align?: "left" | "center";
  id?: string;
  className?: string;
}) {
  const eyebrowColor =
    tone === "paper"
      ? "text-accent-ink"
      : tone === "ink"
        ? "text-paper-on-ink-muted"
        : "text-basha-accent";
  const titleColor =
    tone === "paper"
      ? "text-ink"
      : tone === "ink"
        ? "text-paper-on-ink"
        : "text-basha-text";
  const leadColor =
    tone === "paper"
      ? "text-ink-secondary"
      : tone === "ink"
        ? "text-paper-on-ink-muted"
        : "text-basha-muted";
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={["max-w-[44rem]", alignment, className].filter(Boolean).join(" ")}>
      {eyebrow ? (
        <p className={`eyebrow mb-4 ${eyebrowColor}`}>
          <span
            className="inline-block h-px w-5 translate-y-[-3px] bg-current mr-2.5 align-middle"
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className={`text-h2 ${titleColor}`}>
        {title}
      </Heading>
      {lead ? <p className={`mt-5 text-lead ${leadColor}`}>{lead}</p> : null}
    </div>
  );
}
