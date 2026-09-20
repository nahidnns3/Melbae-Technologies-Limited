import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy notice",
  description:
    "How the Melbae Technologies Limited website handles the limited personal data it collects.",
  path: "/privacy",
});

// Drafted to match what this website actually does. Requires legal review
// before launch; see docs/LAUNCH_READINESS.md.
const UPDATED = "20 September 2026";

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy notice"
      updated={UPDATED}
      intro={`This notice explains what personal data the ${company.legalName} website collects, why, and what your choices are. It covers this corporate website only.`}
    >
      <h2>Who we are</h2>
      <p>
        This website is operated by {company.legalName} (&ldquo;Melbae&rdquo;,
        &ldquo;we&rdquo;), a technology product company based in {company.origin.city},{" "}
        {company.origin.country}. Our products, including Basha OS, have their own privacy
        terms that apply when you use them.
      </p>

      <h2>What we collect and why</h2>
      <h3>Contact form</h3>
      <p>
        When you send us a message through the contact page we receive your name, email
        address, the organization you choose to tell us about, the topic you select, and
        the message itself. We use this only to read and reply to your inquiry and to keep
        a record of the correspondence. The message is delivered to our mailbox by an
        email delivery provider acting on our instructions.
      </p>
      <h3>Website analytics</h3>
      <p>
        We use privacy-preserving, aggregated web analytics to understand which pages are
        read and which links are used. This analytics service does not use cookies, does
        not track you across other websites, and does not receive the contents of anything
        you type. It records page views and a small number of interaction events (for
        example, that a link to Basha OS was followed) together with coarse technical data
        such as browser type, device type and country.
      </p>
      <h3>Server logs</h3>
      <p>
        Like every website, our hosting provider keeps short-lived technical logs (IP
        address, requested page, time, browser) for security and to keep the site running.
        We also use the IP address in the moment to limit abusive submissions of the
        contact form. We do not use these logs to identify visitors.
      </p>

      <h2>Cookies</h2>
      <p>
        This website does not set advertising or tracking cookies. It may use strictly
        necessary storage for security purposes only. Because no consent-requiring cookies
        are used, there is no cookie banner.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell personal data. We share it only with the service providers needed
        to run this website and deliver your messages (hosting, email delivery,
        analytics), each bound to act on our instructions, and where the law requires.
      </p>

      <h2>Retention</h2>
      <p>
        Contact inquiries are kept for as long as needed to respond and to maintain a
        record of our correspondence, after which they are deleted. Aggregated analytics
        contain no personal data and are retained for reporting.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask us what personal data we hold about you, ask us to correct it, or ask
        us to delete it, subject to any legal obligation to keep it. You can do so through
        the contact page
        {company.contactEmail ? ` or by emailing ${company.contactEmail}` : ""}.
      </p>

      <h2>Links to other sites</h2>
      <p>
        This site links to Basha OS and may link to other services. Their privacy
        practices are their own, and we encourage you to read them.
      </p>

      <h2>Changes</h2>
      <p>
        When this notice changes we will update the date at the top of the page.
        Substantial changes will be highlighted here.
      </p>
    </LegalLayout>
  );
}
