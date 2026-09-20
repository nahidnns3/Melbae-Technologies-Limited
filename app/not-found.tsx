import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <section className="container-content section-y">
      <p className="eyebrow text-accent-ink">404</p>
      <h1 className="mt-4 text-h1">This page doesn&rsquo;t exist.</h1>
      <p className="mt-5 max-w-[40rem] text-lead text-ink-secondary">
        The address may be mistyped, or the page may have moved. The links below go to the
        places most people are looking for.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary" size="lg">
          Go to the homepage
        </ButtonLink>
        <ButtonLink href="/products/basha-os" variant="secondary" size="lg">
          Basha OS
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">
          Contact
        </ButtonLink>
      </div>
    </section>
  );
}
