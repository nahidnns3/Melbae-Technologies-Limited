import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ButtonLink } from "@/components/button";
import { SectionIntro } from "@/components/section";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description:
    "Melbae Technologies Limited is a technology product company from Dhaka, Bangladesh. Learn what we build, how we work, and how to work with us.",
  path: "/company",
});

const principles = [
  {
    title: "Useful before impressive",
    body: "A product earns its place by removing real work from someone's day. Features that only look good in a demo are left out.",
  },
  {
    title: "Local workflow, international craft",
    body: "We design from the way work is actually done in Bangladesh, and we hold the engineering, design and writing to the standard of the best product companies anywhere.",
  },
  {
    title: "Say only what is true",
    body: "Our products describe what they do today. Plans are plans until they ship. That applies to this website as much as to the software.",
  },
  {
    title: "Build for a decade",
    body: "Records, identities and money outlive any interface. We make architectural decisions as if the product will still be running in ten years, because it should be.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <section className="container-content section-y">
        <SectionIntro
          as="h1"
          eyebrow="Company"
          title="A product company from Bangladesh, built to last."
          lead={`${company.legalName} designs and builds technology products for everyday operations. We are based in ${company.origin.city}, ${company.origin.country}.`}
        />
      </section>

      <section className="container-content section-y-sm rule-t">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <h2 className="text-h3">Why Melbae exists</h2>
          <div className="measure space-y-5 text-body text-ink-secondary">
            <p>
              A great deal of important work is still run on memory, paper and phone
              calls. Not because the people doing it lack skill, but because the software
              offered to them was built for other places, other languages and other
              habits. The result is operations that work until the one person who
              understands them is unavailable.
            </p>
            <p>
              Melbae exists to find that kind of friction and build products that resolve
              it: software that holds the structure, the people, the money and the history
              of an operation in one place, in the language its users think in, on the
              devices they already carry.
            </p>
            <p>
              We started with residential buildings, because nearly everyone in a city
              lives in one and almost none of them are run with software made for the
              purpose. Basha OS is the result. It is the first Melbae product, and the
              pattern for the ones that follow.
            </p>
            <Link
              href="/products/basha-os"
              className="inline-flex items-center gap-2 rounded-xs font-display text-small font-semibold text-ink"
            >
              About Basha OS <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-content section-y">
          <SectionIntro eyebrow="How we work" title="Principles we can be held to." />
          <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="border-t border-line-strong pt-4">
                <dt className="text-h4">{p.title}</dt>
                <dd className="mt-2 text-body text-ink-secondary">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-content section-y">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <h2 className="text-h3">Where we work from</h2>
          <div className="measure space-y-5 text-body text-ink-secondary">
            <p>
              Melbae is based in Dhaka. Our first market is Bangladesh, where the
              operational problems we care about are concrete, close at hand and largely
              unaddressed by well-made software. Being here is not a constraint on
              ambition; it is where the ambition starts.
            </p>
            <p>
              The company is built to expand beyond one product and, in time, beyond one
              market. That expansion will be visible on this site as it becomes real.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink-ground text-paper-on-ink">
        <div className="container-content section-y">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-1">
              <SectionIntro
                eyebrow="Working with Melbae"
                title="Three ways in."
                tone="ink"
              />
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
              {[
                {
                  title: "Partners",
                  body: "Real-estate developers, building management companies, and organizations in payments, property or operations who see a fit with what we build.",
                  href: "/contact?topic=business-partnership",
                  label: "Discuss a partnership",
                },
                {
                  title: "People",
                  body: "We do not list roles we do not have. If you build products carefully and want to work on problems that matter here, tell us about yourself and we will keep it in mind for real openings.",
                  href: "/contact?topic=careers",
                  label: "Introduce yourself",
                },
                {
                  title: "Everyone else",
                  body: "Press, researchers, prospective customers and anyone curious about the company can reach us through the contact page.",
                  href: "/contact",
                  label: "Contact Melbae",
                },
              ].map((item) => (
                <div key={item.title} className="border-t border-ink-line pt-5">
                  <h3 className="text-h4 text-paper-on-ink">{item.title}</h3>
                  <p className="mt-3 font-display text-small text-paper-on-ink-muted">
                    {item.body}
                  </p>
                  <ButtonLink
                    href={item.href}
                    variant="on-ink"
                    size="md"
                    className="mt-5"
                  >
                    {item.label}
                  </ButtonLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
