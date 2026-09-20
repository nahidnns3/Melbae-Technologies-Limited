import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/products";
import { ArrowRight } from "./button";

const statusLabel: Record<Product["status"], string> = {
  available: "Available",
  "in-development": "In development",
};

/**
 * Product index entry. Reads the product registry so a second product
 * appears with no new markup.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative grid gap-6 rule-t py-8 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10 md:py-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-line bg-paper-elevated">
        <Image
          src={product.mark.src}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
      </div>
      <div className="max-w-2xl">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-h3">
            <Link
              href={product.href}
              className="rounded-xs after:absolute after:inset-0 after:content-['']"
            >
              {product.name}
            </Link>
          </h2>
          <span className="font-display text-caption text-ink-muted">
            {product.category}
          </span>
        </div>
        <p className="mt-3 text-lead text-ink-secondary">{product.purpose}</p>
        <p className="mt-3 text-body text-ink-secondary">{product.summary}</p>
        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 font-display text-caption">
          <div className="flex gap-2">
            <dt className="text-ink-muted">Status</dt>
            <dd className="text-ink">{statusLabel[product.status]}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-muted">Market</dt>
            <dd className="text-ink">{product.availability}</dd>
          </div>
        </dl>
      </div>
      <span className="hidden font-display text-small font-semibold text-ink md:inline-flex md:items-center md:gap-2">
        Product details
        <ArrowRight className="transition-transform duration-(--dur-micro) group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
