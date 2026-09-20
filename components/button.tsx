import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant =
  "primary" | "secondary" | "ghost" | "on-ink" | "on-basha" | "on-basha-ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs font-display font-semibold whitespace-nowrap select-none transition-[background-color,color,border-color] duration-(--dur-micro) ease-(--ease-standard) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 text-[0.9375rem]",
  lg: "min-h-12 px-5 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper-on-ink hover:bg-accent",
  secondary:
    "border border-line-strong text-ink bg-transparent hover:border-ink hover:bg-paper-elevated",
  ghost:
    "text-ink underline underline-offset-4 decoration-line-strong hover:decoration-accent px-1",
  "on-ink": "bg-paper-on-ink text-ink hover:bg-accent hover:text-paper-on-ink",
  "on-basha":
    "bg-basha-accent text-basha-accent-ink hover:bg-[#8fdcae] focus-visible:outline-basha-accent",
  "on-basha-ghost":
    "text-basha-text underline underline-offset-4 decoration-basha-line hover:decoration-basha-accent px-1 focus-visible:outline-basha-accent",
};

function classes(variant: Variant, size: Size, extra?: string) {
  return [base, sizes[size], variants[variant], extra].filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        className={classes(variant, size, className)}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
        <ArrowUpRight />
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H5M10.5 3.5V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M2.5 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
