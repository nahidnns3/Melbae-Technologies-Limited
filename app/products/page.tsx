import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { ProductCard } from "@/components/product-card";
import { SectionIntro } from "@/components/section";
import { products } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Melbae builds technology products for everyday operations. Basha OS, an operating system for residential buildings in Bangladesh, is the first.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <section className="container-content section-y">
        <SectionIntro
          as="h1"
          eyebrow="Products"
          title="What Melbae has built."
          lead="Each Melbae product has its own name, identity and audience, and each is built and maintained by Melbae for the long term. This page lists the products that are real and available today."
        />
        <div className="mt-12 border-b border-line">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-content section-y-sm">
          <div className="grid gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center">
            <div className="max-w-[44rem]">
              <h2 className="text-h3">Further products are in development.</h2>
              <p className="mt-3 text-body text-ink-secondary">
                Melbae works across business operations, financial software, property
                technology, automation and mobility. New products are added to this page
                when they are ready to be used, with their own product story, never as a
                placeholder.
              </p>
            </div>
            <div className="md:justify-self-end">
              <ButtonLink href="/contact" variant="secondary" size="md">
                Ask about upcoming work
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
