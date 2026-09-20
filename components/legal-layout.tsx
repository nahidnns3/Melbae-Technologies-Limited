import type { ReactNode } from "react";

export function LegalLayout({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <article className="container-content section-y">
      <header className="max-w-[44rem]">
        <h1 className="text-h1">{title}</h1>
        <p className="mt-3 font-display text-caption text-ink-muted">
          Last updated {updated}
        </p>
        <p className="mt-6 text-lead text-ink-secondary">{intro}</p>
      </header>
      <div className="prose-legal measure mt-10 text-body text-ink-secondary">
        {children}
      </div>
    </article>
  );
}
