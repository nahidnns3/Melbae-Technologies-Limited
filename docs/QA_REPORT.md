# QA report

Date: 2026-09-20. Environment: production build (`next build` + `next start`),
Chromium (Playwright), Lighthouse 12 mobile simulation.

## Automated checks

| Check                                                         | Result                                                                                                |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                                              | Pass                                                                                                  |
| `pnpm lint` (eslint-config-next core-web-vitals + typescript) | Pass, 0 problems                                                                                      |
| `pnpm test` (Vitest: contact validation, rate limit)          | 9 tests pass                                                                                          |
| `pnpm build`                                                  | Pass; 6 static routes + product route, dynamic `/contact`, generated OG images, sitemap, robots, icon |
| Prettier                                                      | Formatted                                                                                             |

## Accessibility (axe-core, WCAG 2.x A/AA + best-practice rules)

All seven pages plus the 404 at 1440px and 390px: **0 violations** after
two fixes (muted text contrast raised to ≥4.5:1 on all grounds; product
card heading level corrected).

Manual keyboard checks (Playwright-driven): skip link is first in tab order
and moves to `#main`; header tab order is logo → Products → Company →
Contact → CTA; mobile menu opens from the keyboard, moves focus to the
first item, locks body scroll, closes on Escape and returns focus to the
trigger, and closes on navigation. Form fields have visible labels,
`aria-invalid` and `aria-describedby` error wiring, and the first invalid
field receives focus on submit.

Reduced motion: with `prefers-reduced-motion: reduce` the hero and all
entrance animations render in their final state immediately (verified:
heading opacity 1, all connector strokes fully drawn on first paint).

## Responsive

Full-page screenshots at 360, 390, 768, 1024 and 1440px for Home, Basha OS
and Contact (all pages at 390 and 1440). No horizontal overflow at any
width. Compositions restructure rather than shrink: the hero stacks with
the graphic beneath the copy; the product frame switches to a single
column with the layers diagram beneath; workflow grids move from three
columns to two to one; the contact page stacks the explanation above the
form; the footer collapses to a single column with grouped links.

## Functional

- All internal links resolve with HTTP 200; the only external link is
  https://www.bashaos.com (opens in a new tab with `rel="noopener noreferrer"`).
  No `#` links.
- Unknown routes return HTTP 404 with the designed page.
- Contact form: client-side validation blocks empty submission with three
  field errors and focuses the first; server action validates
  independently; honeypot and minimum fill time reject bots; values are
  preserved across every non-success response; without delivery credentials
  the form reports "not accepting messages yet" rather than a false success.
- `?topic=` preselects the inquiry type.
- Metadata: unique titles and descriptions per page, canonical URLs,
  Open Graph and Twitter cards, per-route generated OG images (verified
  visually for Home and Basha OS), sitemap.xml, robots.txt, SVG favicon.
- Structured data: Organization and WebSite on every page;
  SoftwareApplication and BreadcrumbList on the Basha OS page.
- Security headers present on every response: CSP, HSTS, nosniff,
  X-Frame-Options DENY, Referrer-Policy, Permissions-Policy;
  `x-powered-by` removed.
- Bangla text is wrapped in `lang="bn"`.

## Performance (Lighthouse, mobile simulation, slow 4G throttling)

| Page     | Performance | Accessibility | Best practices | SEO | LCP   | CLS | TBT    | Weight  |
| -------- | ----------- | ------------- | -------------- | --- | ----- | --- | ------ | ------- |
| Home     | 93          | 100           | 96             | 100 | 2.8 s | 0   | 190 ms | 359 KiB |
| Basha OS | 94          | 100           | 96             | 100 | 2.9 s | 0   | 90 ms  | 350 KiB |

Font payload was reduced from ~380 KB to ~127 KB (three files) by loading
only the weights used. Remaining LCP time under simulated slow 4G is
dominated by the framework's baseline JavaScript and the first font
request; on real networks the site is well inside the 2.5 s target.

## Browser coverage

Verified in Chromium. Safari and Firefox were not available in this
environment; the implementation avoids the usual Safari hazards (no
`100vh` reliance, no backdrop-filter dependence for readability, standard
sticky header, transforms limited to SVG groups with `transform-box`
set). A manual pass on Safari iOS and Firefox is listed in the launch
checklist.

## Known limitations

- No real Basha OS interface captures are included. The product runs
  behind authentication and no demo account with consistent, non-personal
  data was available in this environment. The product frame and layers
  diagram are original Melbae graphics, presented as diagrams, not as
  screenshots. Slots for authentic captures are the next content addition.
- Contact delivery is implemented but inactive until credentials are set.
