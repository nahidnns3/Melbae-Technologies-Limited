# Public information and product-claim verification matrix

Classification: **A** public-confirmed · **B** public-candidate (verify before
publishing) · **C** future · **D** internal · **E** unsupported (never use).

## Company facts

| Fact                                                    | Class | On site? | Source / note                                             |
| ------------------------------------------------------- | ----- | -------- | --------------------------------------------------------- |
| Legal name "Melbae Technologies Limited"                | A     | Yes      | Project instruction (highest-priority source)             |
| Technology product company                              | A     | Yes      | Project brief                                             |
| Origin: Dhaka, Bangladesh                               | A     | Yes      | Project brief; Basha OS is a Dhaka-focused product        |
| Basha OS is a Melbae product                            | A     | Yes      | Project brief                                             |
| Incorporation status / registration number              | B     | No       | Not available; omitted, not placeholdered                 |
| Registered / business address                           | B     | No       | Omitted                                                   |
| Official corporate domain                               | B     | No (env) | Not registered on the Vercel team; `NEXT_PUBLIC_SITE_URL` |
| Official contact email                                  | B     | No (env) | `NEXT_PUBLIC_CONTACT_EMAIL`; mailto hidden until set      |
| Leadership names, titles, bios, photos                  | B     | No       | Not confirmed as public; no leadership section rendered   |
| Social profiles                                         | B     | No       | None verified; footer renders none                        |
| Founding year                                           | B     | No       | Omitted                                                   |
| Customers, logos, testimonials, counts, funding, awards | E     | No       | Never used                                                |

## Basha OS claims (verified against the production codebase at the time of writing)

| Claim on site                                                                                                                               | Verified | Safe                        | Evidence                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------- | ---------------------------------------------------------- |
| Owner, tenant, building-staff apps (plus platform admin)                                                                                    | Yes      | Yes                         | Route groups for owner, tenant, staff, admin               |
| Property → building → floor → flat → room structure; floor duplication                                                                      | Yes      | Yes                         | Property setup and floor/flat actions                      |
| Tenant invitation by shareable link; owner review and approval; move-in/renew/transfer/move-out                                             | Yes      | Yes                         | Invitation and tenancy actions and routes                  |
| Guided in-browser document capture (framing, blur, glare checks on device)                                                                  | Yes      | Yes                         | KYC wizard and image-quality modules                       |
| Owner document vault; tenant documents hub                                                                                                  | Yes      | Yes                         | Vault actions; tenant documents route                      |
| Rent configuration, proration, single and bulk bill generation, service-charge distribution, utility readings, dues and payments            | Yes      | Yes                         | Billing and service-charge actions and migrations          |
| Bills versioned; revisions carry a reason; gapless numbering                                                                                | Yes      | Yes                         | Bill versions and number sequences                         |
| Numbered receipts; tenant confirm/dispute; PDF with QR verification code                                                                    | Yes      | Yes                         | Receipt PDF route                                          |
| Notices scoped to all / tenants / owners / one flat, with read receipts                                                                     | Yes      | Yes                         | Notice tables and routes                                   |
| Notifications delivered in-app                                                                                                              | Yes      | Yes (worded as in-app only) | Notification outbox; no email/SMS/push channel             |
| Complaints and maintenance with timeline, assignment, attachments                                                                           | Yes      | Yes                         | Maintenance routes and tables                              |
| Facilities listing and booking; parking slots, vehicles, visitor parking                                                                    | Yes      | Yes                         | Facilities and parking modules                             |
| Staff directory, departments, roles/permissions, attendance, shifts, leave, tasks; staff app                                                | Yes      | Yes                         | Staff and workforce modules; staff route group             |
| Owner dashboard across properties; collected-vs-due reports with export; calendar; timeline; audit trail                                    | Yes      | Yes                         | Dashboard, reports (CSV), calendar, timeline, audit routes |
| Bangla default with full English parity; choice remembered                                                                                  | Yes      | Yes                         | i18n module, default language "bn"                         |
| Structured Bangladesh geography: divisions, districts, upazilas/thanas, unions, pourashavas, all city corporations, reconciled postal areas | Yes      | Yes                         | Geo tables and import provenance                           |
| Common local payment methods recordable against a bill                                                                                      | Yes      | Yes (manual recording)      | Payment-method labels                                      |
| Database-enforced access for every record                                                                                                   | Yes      | Yes                         | Row-level security on all tables                           |
| Append-only audit log readable by owners                                                                                                    | Yes      | Yes                         | Audit log migration and owner audit route                  |
| Data export and deletion request from inside the product                                                                                    | Yes      | Yes                         | Account export route; deletion requests                    |
| Monthly packages by flat count, same features in every package                                                                              | Yes      | Yes (no prices printed)     | Subscription package schema                                |
| Bangla tagline "বাসা ভাড়ার সম্পূর্ণ সমাধান" and English "The home rental operating system"                                                 | Yes      | Yes                         | Product strings                                            |

## Claims deliberately excluded

| Claim                                                   | Status in product            | Decision                                        |
| ------------------------------------------------------- | ---------------------------- | ----------------------------------------------- |
| Online payment gateway (bKash, Nagad, cards) / auto-pay | Absent                       | Not mentioned                                   |
| SMS, email or push notifications                        | Absent (in-app only)         | Worded as in-app                                |
| Government / NID verification API                       | Absent (human review only)   | Not mentioned                                   |
| AI features, forecasting, recommendations               | Absent (rule-based insights) | Not mentioned; "AI" never used                  |
| Smart meters / IoT                                      | Absent (manual readings)     | Worded as readings                              |
| Visitor QR systems                                      | Absent                       | Not mentioned                                   |
| Rental marketplace / prospective-renter listings        | Absent                       | Not mentioned                                   |
| Ward-level geography                                    | Not covered                  | Not claimed                                     |
| Exact package prices                                    | Live but changeable          | Directed to the product; verify before printing |
| Enterprise or white-label packages                      | Absent                       | Not claimed                                     |

## Internal details never published

Repository and branch names, migration counts, table names, database
project identifiers, seeded demo building names, internal batch or phase
numbering, test counts, deployment identifiers, roadmap terminology.
