import type { Metadata } from "next";
import { company } from "@/content/site";

/**
 * Builds per-page metadata with canonical URLs, Open Graph and Twitter
 * cards. Open Graph images are generated per route by opengraph-image.tsx
 * files, so they are not set here.
 */
export function pageMetadata({
  title,
  description,
  path,
  titleTemplate = true,
}: {
  title: string;
  description: string;
  path: string;
  titleTemplate?: boolean;
}): Metadata {
  const url = new URL(path, company.siteUrl).toString();
  return {
    title: titleTemplate ? title : { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: company.legalName,
      title,
      description,
      url,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
