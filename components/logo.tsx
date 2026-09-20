import Link from "next/link";

/**
 * Melbae mark: a square field divided into four, with one field in focus.
 * The mark is drawn from the same hairline grammar as the site's diagrams.
 */
export function MelbaeMark({
  size = 28,
  className,
  tone = "ink",
}: {
  size?: number;
  className?: string;
  tone?: "ink" | "paper";
}) {
  const stroke = tone === "ink" ? "var(--color-ink)" : "var(--color-paper-on-ink)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        x="1.25"
        y="1.25"
        width="25.5"
        height="25.5"
        rx="2"
        stroke={stroke}
        strokeWidth="2.5"
      />
      <path d="M14 1.25V26.75M1.25 14H26.75" stroke={stroke} strokeWidth="2" />
      <rect x="14" y="1.25" width="12.75" height="12.75" fill="var(--color-accent)" />
    </svg>
  );
}

export function Wordmark({
  tone = "ink",
  withLegal = false,
}: {
  tone?: "ink" | "paper";
  withLegal?: boolean;
}) {
  const color = tone === "ink" ? "text-ink" : "text-paper-on-ink";
  return (
    <span className={`font-display font-semibold tracking-[-0.02em] ${color}`}>
      Melbae
      {withLegal ? (
        <span className="ml-2 font-medium text-ink-muted">Technologies Limited</span>
      ) : null}
    </span>
  );
}

export function LogoLink({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <Link
      href="/"
      aria-label="Melbae Technologies Limited, home"
      className="inline-flex items-center gap-2.5 rounded-xs text-[1.125rem] leading-none"
    >
      <MelbaeMark size={26} tone={tone} />
      <Wordmark tone={tone} />
    </Link>
  );
}
