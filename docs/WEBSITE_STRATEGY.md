# Melbae corporate website — strategy and design system

This document records the thinking behind the site so future changes stay
coherent. It is internal documentation, not marketing copy.

## 1. Company brief

- **Melbae Technologies Limited** is the parent technology product company.
  Origin: Dhaka, Bangladesh. Ambition: international standard of craft.
- It is a product company. It does not sell development hours, SEO, design or
  IT services, and the site never implies that it does.
- **Basha OS** is the current flagship product: a Bangladesh-focused
  residential property operating system with owner, tenant, building-staff
  and platform-admin applications, live at www.bashaos.com.
- Strategic range (intended areas, not current divisions): software as a
  service, business operations, financial software, property technology,
  automation, mobility. Presented as a quiet list with an explicit caption
  saying exactly that.

## 2. Audience architecture and journeys

| Audience                          | Need                                        | Primary destination         | Action                             |
| --------------------------------- | ------------------------------------------- | --------------------------- | ---------------------------------- |
| Discovering Melbae                | What is this company; is it real            | Home, Company               | Explore Basha OS / About           |
| Potential Basha OS customers      | What it does, for whom, how to start        | /products/basha-os          | Open Basha OS (external)           |
| Real-estate / developer companies | Post-handover operations, service charges   | /products/basha-os, Contact | Contact with topic preselected     |
| Partners                          | Credibility and a contact path              | Company, Contact            | Discuss a partnership              |
| Talent                            | What Melbae builds and how it thinks        | Company                     | Introduce yourself (no fake roles) |
| Investors, media                  | Clarity, factual information, contact route | Home, Company, Contact      | General inquiry                    |

## 3. Sitemap and navigation

```
/                      Home: the corporate argument in eight parts
/products              Product index (registry-driven)
/products/basha-os     Flagship product story
/company               Purpose, principles, origin, ways to work with Melbae
/contact               Structured inquiry form (topic preselect via ?topic=)
/privacy, /terms       Legal pages (drafted, pending legal review)
```

Primary navigation: Products · Company · Contact, plus one CTA
("Explore Basha OS"). Careers, Insights and Technology pages were
deliberately omitted: there are no open roles, no publishing plan and no
need for a framework-logo page.

## 4. Homepage narrative

1. **Identity** — eyebrow names the company and origin; headline states what
   Melbae does in one sentence; support copy names Basha OS as the first
   product; hero graphic shows fragments settling into an ordered ledger.
2. **Point of view** — three patterns of operational friction, numbered and
   ruled, not icon cards.
3. **What Melbae builds** — products, not projects; the strategic range as a
   captioned list.
4. **Flagship proof** — the Basha OS product frame: its own ground, accent,
   mark and Bangla tagline, five verified capability lines, the operating
   layers diagram, two actions.
5. **Product thinking** — four habits derived from how Basha OS is actually
   built (workflow-first, append-only money, least-technical-user design,
   database-enforced access).
6. **Direction** — one company, more than one product; explicit statement
   that further products are announced only when real.
7. **Company** — Dhaka origin, global standard.
8. **Final action** — contact and partnership.

## 5. Creative direction

Three territories were evaluated:

- **A. Ledger / ordered fields** — warm paper ground, ink typography, hairline
  rules, one oxide accent, diagrams of fragmentation resolving into order.
  Strong concept tied to the company's purpose; scales to print and decks.
- **B. Modular grid** — visible structural grid, monochrome plus accent,
  module-connection diagrams. Risk: reads as a developer-tool template.
- **C. Layers** — humanist sans, layered rectangles, muted teal. Risk:
  generic; collides with the Basha OS emerald.

**Chosen: A, "Ordered fields."** It passes the originality test (remove the
logo and the composition still reads as designed), is calm rather than
futuristic, and gives every product its own world inside a defined frame.

### Typography

- Display and UI: **Schibsted Grotesk** 500/600 — a newspaper-derived grotesk
  with editorial confidence and technical character; good numerals.
- Body prose: **Source Serif 4** 400 — a readable screen serif that makes the
  site feel written rather than templated.
- Bangla companion: **Hind Siliguri**, loaded only on the Basha OS route for
  the verified product tagline. All Bangla text is marked `lang="bn"`.
- Scale, line heights and tracking are tokens in `app/globals.css`
  (display 40→68px, h1 34→56px, h2 28→40px, body 17px/1.65, small 15px,
  caption 13px, label 12px tracked uppercase). Measure capped at 40rem.

### Colour

Semantic tokens (all in `app/globals.css`): paper `#f6f4ee`, paper-elevated
`#ffffff`, surface `#ede9df`, ink `#17191d`, ink-secondary `#454850`,
ink-muted `#5c606a` (≥4.5:1 on every ground it is used on), line
`#d9d4c8`, line-strong `#aca597`, accent `#c2401a` with `accent-ink`
`#9a3012` for text, focus `#1f4fd8`, success/warning/error/info, and an ink
ground set for dark editorial sections. The **Basha OS accent slot**
(`basha-*`) carries the product's deep-forest ground and emerald accent and
is used only inside `ProductFrame`. No dark mode: the paper/ink system is the
identity, and a second theme would not strengthen it.

### Grid and layout

Content container 1216px, wide container 1376px, gutters 20/32/48px at
phone/tablet/desktop, section rhythm 64/88/112px. Radius is used sparingly
(3px controls, 6px cards, 10px product frames). Shadows only on product
frames and menus.

### Graphic language

Hairline-ruled structures: scattered fragments (paper notes) resolving into
aligned rows; layered bands for product architecture. Drawn as SVG and HTML
so they stay crisp, themeable and accessible. Usable later for decks,
social graphics and announcements. No dotted networks, globes, circuits,
blobs or fake terminals.

### Motion

Entrance only, and only where it explains: the hero fragments settle and
connectors draw once; section content rises 10px on load. Micro
interactions are 160ms; entrances 480ms; the hero draw 900ms. Everything
collapses to its final state under `prefers-reduced-motion`. No scroll
hijacking, parallax, cursor effects or autoplay video.

## 6. Component system

SiteHeader (with MobileMenu), SiteFooter, SectionIntro, Button/ButtonLink,
TrackLink, ProductCard, ProductFrame, LayersDiagram, FieldGraphic,
ContactForm/Field, LegalLayout, JsonLd, Analytics. Only components the
architecture needed were built.

## 7. Voice

Clear, specific, calm, confident. Short sentences. No "innovation",
"ecosystem", "revolutionize", "world-class", "cutting-edge". Every paragraph
carries information a competitor could not copy verbatim.

## 8. Language strategy

English-first corporate site. Bangla appears only where it is the product's
own verified line (the Basha OS tagline), marked with `lang="bn"`. The
content layer is centralized so a localized route tree can be added later
without touching components.

## 9. Conversion

One primary journey per page: Home → Basha OS; Basha OS → open the product
or contact about a portfolio; Company → contact with topic; Products →
product pages. Analytics events: `cta_click`, `product_outbound`,
`contact_start`, `contact_submit` (outcome only, never form contents).
