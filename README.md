# Melbae Technologies Limited — corporate website

The public website for Melbae Technologies Limited, the parent technology
product company behind Basha OS. Built as a long-term corporate platform:
one company, a product registry that scales to several products, and a
design system specific to Melbae.

## Stack

- Next.js 16 (App Router, React 19, TypeScript strict)
- Tailwind CSS v4 (CSS-first design tokens in `app/globals.css`)
- Self-hosted fonts through `next/font` (Schibsted Grotesk, Source Serif 4,
  Hind Siliguri for the Bangla tagline on the Basha OS page)
- Vercel Web Analytics (production only, cookieless)
- Contact delivery through Resend's HTTP API (no SDK)
- Vitest for unit tests; ESLint (`eslint-config-next`) and Prettier

Runtime dependencies are deliberately few: `next`, `react`, `react-dom`,
`@vercel/analytics`, `server-only`.

## Getting started

```bash
corepack enable            # pnpm 10 is pinned in package.json
pnpm install
cp .env.example .env.local # then fill in values (see below)
pnpm dev
```

Checks a contributor runs before pushing:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Environment variables

| Variable                    | Required     | Purpose                                                                                                                        |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`      | Production   | Canonical origin for canonical URLs, sitemap, robots, Open Graph and structured data. Falls back to the Vercel deployment URL. |
| `RESEND_API_KEY`            | For the form | Resend API key used by the contact server action.                                                                              |
| `CONTACT_INBOX_EMAIL`       | For the form | Mailbox that receives inquiries.                                                                                               |
| `CONTACT_FROM_EMAIL`        | For the form | Verified sender identity on the Resend account.                                                                                |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional     | Public email shown on the site. Leave empty to hide the mailto links until confirmed.                                          |

Until the three contact variables are set, the form tells visitors honestly
that it is not yet accepting messages instead of reporting a false success.

## Project layout

```
app/                    Routes (App Router)
  page.tsx               Home
  products/              Product index and product pages
  company/               Company
  contact/               Contact page + server action
  privacy/, terms/       Legal pages
  opengraph-image.tsx    Generated Open Graph images (one per route)
  sitemap.ts, robots.ts  Search metadata
components/             Reusable components (header, footer, buttons, frames, form)
  graphics/              Original SVG/HTML diagrams
content/                Source of truth for company facts and product claims
  site.ts                Company details, navigation, footer
  products.ts            Product registry (add a product here)
  basha-os.ts            Verified Basha OS product story
lib/                    Metadata, analytics, contact validation/delivery, OG renderer
docs/                   Strategy, verification matrix, QA and launch readiness
public/brand/           Marks (Melbae SVG, Basha OS PNG)
```

## Adding a product

1. Add an entry to `content/products.ts`.
2. Add its mark to `public/brand/`.
3. Create `app/products/<slug>/page.tsx` (and an `opengraph-image.tsx`).
4. If the product needs its own accent, add a token group to
   `app/globals.css` and a `variant` in `components/button.tsx`.

The Products index, footer, sitemap and structured data update automatically.

## Content rules

- Only claims verified in the live product are published. See
  `docs/VERIFICATION_MATRIX.md`.
- No fabricated social proof: no logos, testimonials, counts or awards.
- Company details that are not yet confirmed are left empty in
  `content/site.ts`; the UI omits them rather than rendering placeholders.
  The list of items awaiting confirmation is in `docs/LAUNCH_READINESS.md`.
- Internal engineering details of any Melbae product never appear on the
  site.

## Security

`next.config.ts` sets a strict Content-Security-Policy, HSTS, `nosniff`,
`frame-ancestors 'none'`, a referrer policy and a permissions policy. The
contact server action validates and normalizes input, rejects header
injection, uses a honeypot and a minimum fill time, and rate-limits per IP.
No secrets are read on the client.
