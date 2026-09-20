import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SectionIntro } from "@/components/section";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Melbae Technologies Limited about Basha OS, a real-estate or developer partnership, a business partnership, or working with us.",
  path: "/contact",
});

const reasons = [
  {
    title: "Basha OS",
    body: "You own or manage a building or flats and want to see how Basha OS would work for you, or you already use it and have a question.",
  },
  {
    title: "Real-estate and developer partnerships",
    body: "You hand over buildings to residents and are thinking about how operations, service charges and communication should run afterwards.",
  },
  {
    title: "Business partnerships",
    body: "You work in payments, property, operations or technology and see a fit with what Melbae builds.",
  },
  {
    title: "Working at Melbae",
    body: "We don't list roles we don't have. If you build products carefully, introduce yourself and we will keep it in mind for real openings.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <section className="container-content section-y">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionIntro
            as="h1"
            eyebrow="Contact"
            title="Talk to Melbae."
            lead="Tell us who you are and what you have in mind. Messages go to the people who build the products, not to a queue."
          />
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {reasons.map((r) => (
              <div key={r.title} className="py-4">
                <dt className="font-display text-small font-semibold text-ink">
                  {r.title}
                </dt>
                <dd className="mt-1 font-display text-caption text-ink-secondary">
                  {r.body}
                </dd>
              </div>
            ))}
          </dl>
          {company.contactEmail ? (
            <p className="mt-8 font-display text-small text-ink-secondary">
              Prefer email?{" "}
              <a className="link" href={`mailto:${company.contactEmail}`}>
                {company.contactEmail}
              </a>
            </p>
          ) : null}
          <p className="mt-4 font-display text-small text-ink-secondary">
            {company.legalName} · {company.origin.city}, {company.origin.country}
          </p>
        </div>
        <div className="relative rounded-md border border-line bg-paper p-6 sm:p-8 lg:p-10">
          <ContactForm initialTopic={topic} contactEmail={company.contactEmail} />
        </div>
      </div>
    </section>
  );
}
