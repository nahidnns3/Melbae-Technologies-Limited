/**
 * Product registry.
 *
 * Adding a second Melbae product means adding one entry here. The Products
 * index, footer, sitemap and structured data all read from this list. Only
 * products that are real and publicly ready belong here; unreleased work is
 * described in prose on the Products page, never as an entry.
 */

export type ProductStatus = "available" | "in-development";

export interface Product {
  slug: string;
  name: string;
  /** Short category label shown alongside the name. */
  category: string;
  /** One line: what it is, for whom. */
  purpose: string;
  /** Two or three sentences for index cards and previews. */
  summary: string;
  status: ProductStatus;
  /** Markets where the product is offered. */
  availability: string;
  /** Live product destination, if any. */
  externalUrl?: string;
  /** Detail page on this site. */
  href: string;
  /** Product mark, served from /public. */
  mark: { src: string; alt: string };
  /** Accent used inside the product frame. Must be a token defined in globals.css. */
  accent: "basha";
}

export const products: Product[] = [
  {
    slug: "basha-os",
    name: "Basha OS",
    category: "Residential property operations",
    purpose:
      "An operating system for residential buildings in Bangladesh, built for owners, tenants and building staff.",
    summary:
      "Basha OS brings the day-to-day running of a building into one system: flats and tenancies, monthly rent and service charges, receipts, notices, maintenance and staff. It works in Bangla and English, on the phone in a caretaker's pocket.",
    status: "available",
    availability: "Bangladesh",
    externalUrl: "https://www.bashaos.com",
    href: "/products/basha-os",
    mark: { src: "/brand/basha-os-mark.png", alt: "Basha OS" },
    accent: "basha",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
