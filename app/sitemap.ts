import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { company } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/products`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/company`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}${p.href}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  }));
  return [...staticRoutes, ...productRoutes];
}
