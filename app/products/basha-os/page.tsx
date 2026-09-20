import type { Metadata } from "next";
import Image from "next/image";
import { Hind_Siliguri } from "next/font/google";
import { ButtonLink } from "@/components/button";
import { LayersDiagram } from "@/components/graphics/layers-diagram";
import { JsonLd } from "@/components/json-ld";
import { ProductFrame } from "@/components/product-frame";
import { SectionIntro } from "@/components/section";
import { TrackLink } from "@/components/track-link";
import { bashaOs } from "@/content/basha-os";
import { getProduct } from "@/content/products";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const bangla = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500"],
  variable: "--font-bangla-var",
  display: "swap",
});

export const metadata: Metadata = pageMetadata({
  title: "Basha OS",
  description:
    "Basha OS is a Bangladesh-focused operating system for residential buildings: flats and tenancies, monthly rent and service charges, receipts, notices, maintenance and staff, in Bangla and English.",
  path: "/products/basha-os",
});

export default function BashaOsPage() {
  const product = getProduct("basha-os")!;
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: bashaOs.externalUrl,
    description: product.purpose,
    inLanguage: ["bn", "en"],
    areaServed: "BD",
    author: { "@type": "Organization", name: company.legalName, url: company.siteUrl },
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: `${company.siteUrl}/products`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: `${company.siteUrl}${product.href}`,
      },
    ],
  };

  return (
    <div className={bangla.variable}>
      {/* A. Identity */}
      <section className="container-content section-y">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 font-display text-caption text-ink-muted"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <a href="/products" className="link">
                Products
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-sm border border-line bg-paper-elevated">
                <Image
                  src={product.mark.src}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  priority
                />
              </span>
              <div>
                <p className="font-display text-h3 font-semibold text-ink">
                  {product.name}
                </p>
                <p className="font-display text-caption text-ink-muted">
                  {product.category} · A Melbae product
                </p>
              </div>
            </div>
            <h1 className="mt-8 text-h1">{bashaOs.identity.heading}</h1>
            <p className="mt-6 max-w-[40rem] text-lead text-ink-secondary">
              {bashaOs.identity.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackLink
                href={bashaOs.externalUrl}
                external
                variant="primary"
                size="lg"
                event={{
                  name: "product_outbound",
                  product: "basha-os",
                  location: "product-hero",
                }}
              >
                {bashaOs.cta.primary.label}
              </TrackLink>
              <ButtonLink href={bashaOs.cta.secondary.href} variant="secondary" size="lg">
                {bashaOs.cta.secondary.label}
              </ButtonLink>
            </div>
          </div>
          <aside className="self-end rounded-md border border-line bg-paper-elevated p-6 lg:p-8">
            <p lang="bn" className="font-bangla text-h3 font-medium text-ink">
              {bashaOs.taglineBangla}
            </p>
            <p className="mt-2 font-display text-small text-ink-muted">
              {bashaOs.taglineEnglish}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 font-display text-small">
              <div>
                <dt className="text-caption text-ink-muted">Market</dt>
                <dd className="text-ink">{product.availability}</dd>
              </div>
              <div>
                <dt className="text-caption text-ink-muted">Languages</dt>
                <dd className="text-ink">Bangla, English</dd>
              </div>
              <div>
                <dt className="text-caption text-ink-muted">Runs on</dt>
                <dd className="text-ink">Any modern phone or computer browser</dd>
              </div>
              <div>
                <dt className="text-caption text-ink-muted">For</dt>
                <dd className="text-ink">Owners, tenants, building staff</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* B. Problem */}
      <section className="bg-surface">
        <div className="container-content section-y">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-20">
            <SectionIntro
              eyebrow="The problem"
              title={bashaOs.problem.heading}
              lead={bashaOs.problem.intro}
            />
            <div>
              <ul
                className="grid gap-2 sm:grid-cols-2"
                aria-label="Where records usually live"
              >
                {bashaOs.problem.fragments.map((f, i) => {
                  const rotations = [
                    "-rotate-1",
                    "rotate-1",
                    "rotate-0",
                    "-rotate-1",
                    "rotate-1",
                    "rotate-0",
                  ];
                  return (
                    <li
                      key={f}
                      className={`${rotations[i % rotations.length]} rounded-xs border border-line-strong bg-paper-elevated px-4 py-3 font-display text-small text-ink-secondary`}
                    >
                      {f}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-8 text-body text-ink-secondary">
                {bashaOs.problem.consequence}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* C. Product model */}
      <section className="container-wide section-y">
        <SectionIntro
          eyebrow="The model"
          title={bashaOs.model.heading}
          lead={bashaOs.model.intro}
          className="mb-10"
        />
        <ProductFrame mark={product.mark} name={product.name} category={product.category}>
          <LayersDiagram />
        </ProductFrame>
      </section>

      {/* D. Core workflows */}
      <section className="container-content section-y rule-t">
        <SectionIntro
          eyebrow="What it does"
          title="The work of a building, organized into workflows."
          lead="Rather than a long list of features, Basha OS is organized around the recurring work of running a building. Each area below is available in the product today."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {bashaOs.workflows.map((w, i) => (
            <li key={w.name} className="bg-paper p-6 lg:p-7">
              <span className="font-display text-caption font-semibold tabular text-accent-ink">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-h4">{w.name}</h3>
              <p className="mt-2 font-display text-small text-ink-secondary">
                {w.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* E + F. Perspectives */}
      <section className="bg-ink-ground text-paper-on-ink">
        <div className="container-content section-y">
          <SectionIntro
            eyebrow="Three sides of one building"
            title="Everyone sees the same building from their own side."
            tone="ink"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {bashaOs.perspectives.map((p) => (
              <div key={p.audience} className="border-t border-ink-line pt-5">
                <h3 className="text-h4 text-paper-on-ink">{p.audience}</h3>
                <p className="mt-3 font-display text-small text-paper-on-ink-muted">
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G. Local design */}
      <section className="container-content section-y">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <SectionIntro
            eyebrow="Made for Bangladesh"
            title={bashaOs.local.heading}
            lead="Basha OS is not a global template with a Bangla translation. Its defaults come from how buildings, addresses, money and phones actually work here."
          />
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {bashaOs.local.points.map((p) => (
              <div key={p.title} className="border-t border-line pt-4">
                <dt className="text-h4">{p.title}</dt>
                <dd className="mt-2 font-display text-small text-ink-secondary">
                  {p.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-surface">
        <div className="container-content section-y">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <SectionIntro
              eyebrow="Trust"
              title={bashaOs.trust.heading}
              lead="A building's records are its memory. Basha OS is engineered so that memory cannot quietly change."
            />
            <ul className="divide-y divide-line border-y border-line">
              {bashaOs.trust.points.map((t) => (
                <li
                  key={t}
                  className="flex gap-4 py-4 font-display text-small text-ink-secondary"
                >
                  <span
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Commercial + CTA */}
      <section className="container-content section-y">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <SectionIntro
              eyebrow="Pricing"
              title={bashaOs.commercial.heading}
              lead={bashaOs.commercial.detail}
            />
            <p className="mt-6 max-w-[44rem] text-body text-ink-secondary">
              If you manage a building or a portfolio of flats, the fastest way to
              evaluate Basha OS is to set up a property in it. If you are a developer or
              management company thinking about operations after handover, talk to us
              first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <TrackLink
              href={bashaOs.externalUrl}
              external
              variant="primary"
              size="lg"
              event={{
                name: "product_outbound",
                product: "basha-os",
                location: "product-footer",
              }}
            >
              {bashaOs.cta.primary.label}
            </TrackLink>
            <ButtonLink
              href="/contact?topic=developer-partnership"
              variant="secondary"
              size="lg"
            >
              Talk about a building portfolio
            </ButtonLink>
          </div>
        </div>
      </section>

      <JsonLd data={softwareApplication} />
      <JsonLd data={breadcrumbs} />
    </div>
  );
}
