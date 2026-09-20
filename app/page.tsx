import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ButtonLink } from "@/components/button";
import { FieldGraphic } from "@/components/graphics/field-graphic";
import { LayersDiagram } from "@/components/graphics/layers-diagram";
import { ProductFrame } from "@/components/product-frame";
import { SectionIntro } from "@/components/section";
import { TrackLink } from "@/components/track-link";
import { bashaOs } from "@/content/basha-os";
import { products } from "@/content/products";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: `${company.legalName} — Technology products from Bangladesh`,
  titleTemplate: false,
  description: company.description,
  path: "/",
});

const attention = [
  {
    title: "Work that runs on memory",
    body: "Many operations still depend on one person remembering how things are done. When that person is unavailable, the operation is too. We build systems that hold the knowledge so people don't have to.",
  },
  {
    title: "Records that live in five places",
    body: "A notebook, a spreadsheet, a chat thread, a folder, a phone. Each is fine on its own. Together they cannot answer a simple question about last month. We bring the record into one place with one history.",
  },
  {
    title: "Software built for somewhere else",
    body: "Imported tools assume addresses, billing conventions, languages and habits that don't match how work happens here. We design from the local workflow outward, to an international standard of craft.",
  },
];

const practice = [
  {
    title: "Start from the real workflow",
    body: "Before a screen is designed, the actual sequence of work is written down: who does what, with which piece of paper, at which moment of the month. The product follows that sequence rather than asking people to learn a new one.",
  },
  {
    title: "Get the money right",
    body: "Where a product touches money, history is never overwritten. Bills are versioned, revisions carry a reason, numbers are issued without gaps, and every significant change is written to a log that cannot be edited.",
  },
  {
    title: "Design for the least technical person in the building",
    body: "If a caretaker with a modest phone cannot use it in their own language, it is not finished. Bangla first, short flows, large targets, and nothing that depends on a hover.",
  },
  {
    title: "Build it properly",
    body: "Access rules are enforced by the database, not by the interface. Tests cover the arithmetic. The boring engineering is done so the product can be trusted with records people cannot afford to lose.",
  },
];

const range = [
  "Software as a service",
  "Business operations",
  "Financial software",
  "Property technology",
  "Automation",
  "Mobility",
];

export default function HomePage() {
  const flagship = products[0]!;
  return (
    <>
      {/* 1. Identity */}
      <section className="container-wide section-y overflow-hidden">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] lg:gap-16">
          <div className="max-w-2xl">
            <p className="eyebrow rise text-accent-ink">
              {company.legalName} · {company.origin.city}, {company.origin.country}
            </p>
            <h1 className="rise-1 mt-6 text-display">
              Clear software for the operations people actually run.
            </h1>
            <p className="rise-2 mt-7 max-w-xl text-lead text-ink-secondary">
              Melbae is a technology product company from Bangladesh. We look for everyday
              operational work that still runs on notebooks, phone calls and spreadsheets,
              and build products that make it simpler to run. Our first product, Basha OS,
              does this for residential buildings.
            </p>
            <div className="rise-3 mt-9 flex flex-wrap items-center gap-3">
              <TrackLink
                href={flagship.href}
                variant="primary"
                size="lg"
                event={{
                  name: "cta_click",
                  cta: "explore-basha-os",
                  location: "home-hero",
                }}
              >
                Explore Basha OS
              </TrackLink>
              <ButtonLink href="/company" variant="secondary" size="lg">
                About the company
              </ButtonLink>
            </div>
          </div>
          <div className="relative -mx-5 sm:mx-0">
            <FieldGraphic className="h-auto w-full" />
          </div>
        </div>
      </section>

      {/* 2. Point of view */}
      <section className="container-content section-y rule-t">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <SectionIntro
            eyebrow="What we pay attention to"
            title="The friction is usually in the system, not the people."
            lead="Melbae looks for operational work where capable people are held back by the way information is kept. Three patterns come up again and again."
          />
          <ol className="divide-y divide-line border-y border-line">
            {attention.map((item, i) => (
              <li key={item.title} className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr]">
                <span className="font-display text-caption font-semibold tabular text-accent-ink">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-h4">{item.title}</h3>
                  <p className="mt-2 text-body text-ink-secondary">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. What Melbae builds */}
      <section className="bg-surface">
        <div className="container-content section-y">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
            <SectionIntro
              eyebrow="What we build"
              title="Products, not projects."
              lead="Melbae does not sell development hours or take on client work. We choose a problem, build a product around it, and keep improving that product for the people who depend on it."
            />
            <div className="lg:pt-2">
              <p className="text-body text-ink-secondary">
                The range we work across is deliberately broad, because operational
                friction does not respect industry lines. Today our work is concentrated
                in property operations. Over time it will extend into the areas below, one
                real product at a time.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas of work">
                {range.map((r) => (
                  <li
                    key={r}
                    className="rounded-xs border border-line-strong bg-paper px-3 py-1.5 font-display text-caption font-medium text-ink-secondary"
                  >
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-display text-caption text-ink-muted">
                Areas of intended work, not a list of current divisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Flagship proof */}
      <section className="container-wide section-y">
        <SectionIntro
          eyebrow="Flagship product"
          title="Basha OS: the clearest example of what we do."
          lead="A residential building in Bangladesh is a small operation with real money, many people and a lot of paper. Basha OS brings its structure, people, money and everyday operations into one system."
          className="mb-10"
        />
        <ProductFrame
          mark={flagship.mark}
          name={flagship.name}
          category={flagship.category}
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <div>
              <p lang="bn" className="font-bangla text-h3 font-medium text-basha-text">
                {bashaOs.taglineBangla}
              </p>
              <p className="mt-2 font-display text-small text-basha-muted">
                {bashaOs.taglineEnglish}
              </p>
              <p className="mt-6 font-display text-body text-basha-text/90">
                {flagship.summary}
              </p>
              <ul className="mt-6 space-y-2 font-display text-small text-basha-muted">
                {[
                  "Owner, tenant and staff apps in one product",
                  "Monthly rent, service charges and utilities with full history",
                  "Numbered receipts with QR verification",
                  "Notices, maintenance, facilities, parking and staff",
                  "Bangla first, English throughout",
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-basha-accent"
                      aria-hidden="true"
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={flagship.href} variant="on-basha" size="md">
                  See the product story
                </ButtonLink>
                <TrackLink
                  href={bashaOs.externalUrl}
                  external
                  variant="on-basha-ghost"
                  size="md"
                  event={{
                    name: "product_outbound",
                    product: "basha-os",
                    location: "home-flagship",
                  }}
                >
                  Open Basha OS
                </TrackLink>
              </div>
            </div>
            <LayersDiagram />
          </div>
        </ProductFrame>
      </section>

      {/* 5. Product thinking */}
      <section className="bg-ink-ground text-paper-on-ink">
        <div className="container-content section-y">
          <SectionIntro
            eyebrow="How we build"
            title="Four habits that show up in every Melbae product."
            tone="ink"
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line md:grid-cols-2">
            {practice.map((item, i) => (
              <li key={item.title} className="bg-ink-ground p-7 lg:p-9">
                <span className="font-display text-caption font-semibold tabular text-paper-on-ink-muted">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-h4 text-paper-on-ink">{item.title}</h3>
                <p className="mt-3 font-display text-small text-paper-on-ink-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 + 7. Direction and company */}
      <section className="container-content section-y">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro
              eyebrow="Direction"
              title="One company, more than one product."
              lead="Basha OS is the first product, not the whole company. Melbae is built to carry several products, each with its own identity, under one standard of craft."
            />
            <p className="mt-6 max-w-[44rem] text-body text-ink-secondary">
              We are developing further products. We will announce them when they are real
              and ready to be used, not before.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xs font-display text-small font-semibold text-ink"
            >
              See all products <ArrowRight />
            </Link>
          </div>
          <div>
            <SectionIntro
              eyebrow="Company"
              title="From Dhaka, built to a global standard."
              lead="Melbae Technologies Limited is based in Dhaka, Bangladesh. We build for the people and operations around us first, and we hold the work to the standard of the best product companies anywhere."
            />
            <Link
              href="/company"
              className="mt-6 inline-flex items-center gap-2 rounded-xs font-display text-small font-semibold text-ink"
            >
              About Melbae <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Final action */}
      <section className="bg-surface">
        <div className="container-content section-y">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <SectionIntro
              eyebrow="Next step"
              title="Talk to Melbae."
              lead="Whether you run a building and want to see Basha OS, work at a developer or management company thinking about post-handover operations, or want to explore a partnership, we would like to hear from you."
            />
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <TrackLink
                href="/contact"
                variant="primary"
                size="lg"
                event={{ name: "cta_click", cta: "contact", location: "home-final" }}
              >
                Contact Melbae
              </TrackLink>
              <ButtonLink
                href="/contact?topic=developer-partnership"
                variant="secondary"
                size="lg"
              >
                Discuss a partnership
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
