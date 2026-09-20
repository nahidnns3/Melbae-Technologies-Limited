import Link from "next/link";
import { company, footerGroups } from "@/content/site";
import { MelbaeMark, Wordmark } from "./logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-ground text-paper-on-ink">
      <div className="container-content section-y-sm">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] md:gap-8">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Melbae Technologies Limited, home"
              className="inline-flex items-center gap-2.5 rounded-xs text-[1.125rem] leading-none"
            >
              <MelbaeMark size={26} tone="paper" />
              <Wordmark tone="paper" />
            </Link>
            <p className="mt-5 font-display text-small text-paper-on-ink-muted">
              A technology product company from {company.origin.city},{" "}
              {company.origin.country}. We build software that makes everyday operational
              work simpler to run.
            </p>
            {company.contactEmail ? (
              <p className="mt-4 font-display text-small">
                <a className="link-on-ink" href={`mailto:${company.contactEmail}`}>
                  {company.contactEmail}
                </a>
              </p>
            ) : null}
          </div>

          {footerGroups.map((group) => (
            <nav key={group.heading} aria-labelledby={`footer-${group.heading}`}>
              <h2
                id={`footer-${group.heading}`}
                className="eyebrow text-paper-on-ink-muted"
              >
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-8 items-center rounded-xs font-display text-small text-paper-on-ink transition-colors duration-(--dur-micro) hover:text-paper-on-ink-muted"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-line pt-6 font-display text-caption text-paper-on-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p>Basha OS is a product of {company.legalName}.</p>
        </div>
      </div>
    </footer>
  );
}
