/**
 * Company source of truth for the corporate website.
 *
 * Every public fact about Melbae lives here so that it can be verified in one
 * place. Fields marked VERIFY are not yet confirmed by leadership; the UI is
 * written to omit an element entirely when its value is empty rather than
 * render a placeholder.
 */

export const company = {
  legalName: "Melbae Technologies Limited",
  shortName: "Melbae",
  descriptor: "Technology product company",
  origin: {
    city: "Dhaka",
    country: "Bangladesh",
  },
  /**
   * One-sentence public description used in metadata and structured data.
   */
  description:
    "Melbae Technologies Limited is a technology product company from Bangladesh. It builds software that makes everyday operational work simpler to run, starting with Basha OS for residential buildings.",

  /**
   * VERIFY BEFORE LAUNCH — canonical public origin. Read from the environment
   * so preview deployments resolve correctly. Falls back to the Vercel
   * deployment URL and finally to localhost during development.
   */
  siteUrl: resolveSiteUrl(),

  /**
   * VERIFY BEFORE LAUNCH — official contact mailbox. Empty hides the mailto
   * link everywhere; the contact form remains the primary path.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",

  /**
   * VERIFY BEFORE LAUNCH — registered address, registration number, and
   * leadership are intentionally absent until confirmed as public.
   */
  registeredAddress: "",
  registrationNumber: "",

  /**
   * Social profiles: only verified, active Melbae profiles may be listed.
   * None are confirmed yet, so the footer renders no social links.
   */
  social: [] as { label: string; href: string }[],

  foundedYear: "" as string,
} as const;

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

export const nav = {
  primary: [
    { label: "Products", href: "/products" },
    { label: "Company", href: "/company" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Explore Basha OS", href: "/products/basha-os" },
} as const;

export const footerGroups = [
  {
    heading: "Products",
    links: [
      { label: "Basha OS", href: "/products/basha-os" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Melbae", href: "/company" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
] as const;
