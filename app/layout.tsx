import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/content/site";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display-var",
  display: "swap",
});

const body = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body-var",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: `${company.legalName} — Technology products from Bangladesh`,
    template: `%s — Melbae`,
  },
  description: company.description,
  applicationName: company.shortName,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: company.legalName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.shortName,
    url: company.siteUrl,
    logo: `${company.siteUrl}/brand/melbae-mark.svg`,
    description: company.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.origin.city,
      addressCountry: "BD",
    },
    ...(company.contactEmail ? { email: company.contactEmail } : {}),
    ...(company.social.length ? { sameAs: company.social.map((s) => s.href) } : {}),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.legalName,
    url: company.siteUrl,
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xs focus:bg-ink focus:px-4 focus:py-2 focus:font-display focus:text-paper-on-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organization} />
        <JsonLd data={website} />
        <Analytics />
      </body>
    </html>
  );
}
