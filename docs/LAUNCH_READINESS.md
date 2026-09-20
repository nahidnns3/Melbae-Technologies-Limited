# Launch readiness

## Status

The site is complete as a corporate platform: all pages, copy, design
system, product story, contact flow, metadata, structured data, analytics
hooks, security headers, accessibility and performance work are
implemented and verified (see `QA_REPORT.md`). It is not yet launchable
because a small number of company facts must be confirmed by leadership
and a few operational switches must be turned on.

## Launch blockers (require a decision or a value)

| #   | Item                                             | Where it lives                                     | Notes                                                                                                                                         |
| --- | ------------------------------------------------ | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Official corporate domain                        | `NEXT_PUBLIC_SITE_URL`                             | No Melbae domain exists on the Vercel team yet. Register, add to the project, set the variable. Canonicals, sitemap and OG URLs depend on it. |
| 2   | Official contact mailbox                         | `CONTACT_INBOX_EMAIL`, `NEXT_PUBLIC_CONTACT_EMAIL` | Until set, mailto links are hidden and the form reports that it is not accepting messages.                                                    |
| 3   | Email delivery credentials                       | `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`             | Resend account with a verified sending domain. Any provider with an HTTP API can replace it in `lib/contact/send.ts`.                         |
| 4   | Legal review of Privacy notice and Website terms | `app/privacy`, `app/terms`                         | Drafted to match what the site actually does. Confirm governing law wording and add registration details if they must appear.                 |
| 5   | Confirm company description and origin wording   | `content/site.ts`, Home, Company                   | "Technology product company from Dhaka, Bangladesh."                                                                                          |

## Verify before publishing (site works without them)

| Item                                                          | Current handling                                                                                                                                                            |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Incorporation status, registration number, registered address | Omitted entirely. Add to `content/site.ts` and the footer/legal pages if required.                                                                                          |
| Leadership names, titles, biographies, photography            | No leadership section rendered. Add to the Company page only with approved material.                                                                                        |
| Social profiles                                               | None rendered. Add verified profiles to `content/site.ts` (`social`).                                                                                                       |
| Basha OS name spelling                                        | The site uses "Basha OS" (per brief). The product itself uses both "BashaOS" and "Basha OS"; align the product before launch.                                               |
| Basha OS package prices                                       | Not printed. The site says packages depend on flat count with identical features and points to the product. Verify the live commercial policy before ever printing figures. |
| Authentic Basha OS interface captures                         | Not included (no demo account available). Capture with consistent, non-personal demo data and add to the product frame and the Basha OS page.                               |
| Analytics                                                     | Vercel Web Analytics is wired (production only). Enable it on the Vercel project, or remove `components/analytics.tsx` if a different tool is chosen.                       |
| Vercel project                                                | Create a project for this repository (framework auto-detected), set the environment variables above, and add the domain.                                                    |

## Pre-launch manual checks

- Safari (macOS and iOS) and Firefox pass on Home, Basha OS and Contact,
  including the mobile menu and the form.
- Share previews checked on LinkedIn, Facebook, X and WhatsApp using the
  production domain.
- Send a real inquiry through the form and confirm it arrives with
  reply-to set to the sender.
- Confirm `robots.txt` and `sitemap.xml` on the production domain, then
  submit the sitemap to Google Search Console.

## Deliberately not built (and why)

- Careers page: no open roles. The Company page carries an honest talent
  path instead.
- Insights/blog: no publishing plan.
- Technology page: no need for a framework-logo page.
- Dark mode: the paper/ink system is the identity.
- CMS: content is structured local TypeScript; a CMS can be added behind
  the `content/` layer if editorial volume ever justifies it.
