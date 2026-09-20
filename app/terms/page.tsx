import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Website terms",
  description:
    "Terms that apply to using the Melbae Technologies Limited corporate website.",
  path: "/terms",
});

// Drafted to match what this website actually does. Requires legal review
// before launch; see docs/LAUNCH_READINESS.md.
const UPDATED = "20 September 2026";

export default function TermsPage() {
  return (
    <LegalLayout
      title="Website terms"
      updated={UPDATED}
      intro={`These terms apply to your use of the ${company.legalName} corporate website. Our products, including Basha OS, are governed by their own terms of service.`}
    >
      <h2>Using this website</h2>
      <p>
        You may browse this website and use its contact form for lawful purposes. You must
        not attempt to interfere with its operation, probe its security, submit automated
        or abusive traffic, or use the contact form to send unsolicited commercial
        messages.
      </p>

      <h2>Information on this site</h2>
      <p>
        We work hard to keep what we publish accurate and current, and we describe our
        products as they exist today. Even so, information on this website is provided for
        general purposes, may change without notice, and does not form part of any
        contract. Product capabilities, availability and pricing are those stated within
        the product itself at the time you use it.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Melbae name and mark, the Basha OS name and mark, and the text, design,
        graphics and code of this website belong to {company.legalName} or its licensors.
        You may quote from this site with attribution for commentary, news reporting or
        research. Any other reproduction requires our written permission.
      </p>

      <h2>Links</h2>
      <p>
        This website links to Basha OS and may link to third-party sites. We are not
        responsible for the content or practices of sites we do not operate.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, {company.legalName} is not liable for loss or
        damage arising from use of, or inability to use, this website or reliance on its
        content. Nothing in these terms limits liability that cannot be limited by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Bangladesh, and any dispute relating to
        them is subject to the jurisdiction of the courts of Bangladesh.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent through the{" "}
        <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  );
}
