"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav } from "@/content/site";
import { LogoLink } from "./logo";
import { ButtonLink } from "./button";

/**
 * Site header. Desktop: inline navigation with active states. Mobile: a
 * disclosure panel below the header with focus management, Escape to close,
 * and body scroll locked while open. Header height is fixed so layout never
 * shifts when the route changes.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedOnPath, setOpenedOnPath] = useState(pathname);
  const panelId = useId();

  // Close on route change (state adjusted during render, per React guidance).
  if (openedOnPath !== pathname) {
    setOpenedOnPath(pathname);
    if (open) setOpen(false);
  }
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Scroll lock, Escape, and focus handling while the panel is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the panel if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm supports-[backdrop-filter]:bg-paper/85">
      <div className="container-content flex h-16 items-center justify-between gap-6">
        <LogoLink />

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-1">
          {nav.primary.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative inline-flex min-h-10 items-center rounded-xs px-3 font-display text-[0.9375rem] font-medium transition-colors duration-(--dur-micro)",
                  active ? "text-ink" : "text-ink-secondary hover:text-ink",
                ].join(" ")}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute inset-x-3 -bottom-[calc(1.5rem-1px)] h-0.5 transition-colors duration-(--dur-micro)",
                    active ? "bg-accent" : "bg-transparent",
                  ].join(" ")}
                />
              </Link>
            );
          })}
          <ButtonLink href={nav.cta.href} variant="primary" size="md" className="ml-3">
            {nav.cta.label}
          </ButtonLink>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xs text-ink md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M4 4L18 18M18 4L4 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6H19M3 11H19M3 16H19"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="md:hidden border-t border-line bg-paper"
      >
        <nav
          aria-label="Primary, mobile"
          className="container-content flex flex-col py-3"
        >
          {nav.primary.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={i === 0 ? firstLinkRef : undefined}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex min-h-12 items-center justify-between rounded-xs border-b border-line font-display text-[1.0625rem] font-medium last:border-b-0",
                  active ? "text-ink" : "text-ink-secondary",
                ].join(" ")}
              >
                {item.label}
                {active ? (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            );
          })}
          <ButtonLink href={nav.cta.href} variant="primary" size="lg" className="mt-4">
            {nav.cta.label}
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
