/**
 * Basha OS product story for the corporate site.
 *
 * Every capability listed here was verified against the live product's route
 * tree, server actions and database migrations before inclusion. Anything
 * absent from the product (online payment gateways, SMS or push delivery,
 * government identity verification, AI features, smart meters, a rental
 * marketplace) is deliberately not described.
 */

export const bashaOs = {
  name: "Basha OS",
  taglineBangla: "বাসা ভাড়ার সম্পূর্ণ সমাধান",
  taglineEnglish: "The home rental operating system",
  externalUrl: "https://www.bashaos.com",

  identity: {
    heading: "One system for running a residential building.",
    lead: "Basha OS is a Bangladesh-focused operating system for residential property. It holds the structure of a building, the people who live in it, the money that moves through it each month, and the everyday operations that keep it working, in one place that owners, tenants and staff each see from their own side.",
  },

  problem: {
    heading: "Where building operations usually live today",
    intro:
      "Most residential buildings are run well by people with good memories. The information itself is scattered: a notebook for rent, a spreadsheet for service charges, message threads for complaints, the caretaker's knowledge of who lives where, a folder of photocopied documents, and receipts that exist only if someone remembered to write one.",
    fragments: [
      "Rent ledger in a notebook",
      "Service charges in a spreadsheet",
      "Complaints in message threads",
      "Tenant documents in a folder",
      "Who lives where, in the caretaker's head",
      "Receipts written by hand, sometimes",
    ],
    consequence:
      "That works until it doesn't. A dispute about last year's dues, a handover to a new manager, a flat that changes hands, or a building that grows past a dozen units, and the system that lived in one person's memory has to be rebuilt from scraps.",
  },

  model: {
    heading: "How Basha OS organizes it",
    intro:
      "Basha OS treats a building as a structured system with four layers, each visible to the people who need it.",
    layers: [
      {
        name: "Structure",
        detail: "Properties, buildings, floors, flats and their rooms.",
      },
      {
        name: "People",
        detail: "Owners and co-owners, managers, tenants and households, building staff.",
      },
      {
        name: "Money",
        detail:
          "Rent terms, monthly bills, service charges, utilities, dues, payments and receipts.",
      },
      {
        name: "Operations",
        detail: "Notices, maintenance, facilities, parking, staff schedules and records.",
      },
    ],
  },

  workflows: [
    {
      name: "Property structure",
      summary:
        "Set up a property from the top down: buildings, floors, flats and rooms, each with the details that billing and tenancy depend on. Repeated floors can be duplicated rather than re-entered.",
    },
    {
      name: "People and tenancy",
      summary:
        "Invite a tenant to a specific flat with a shareable link. Tenants complete their own profile and household details, the owner reviews and approves, and the tenancy record carries through move-in, renewal, transfer and move-out.",
    },
    {
      name: "Identity and documents",
      summary:
        "Capture tenant identity documents with a guided in-browser scanner that checks framing, blur and glare as the photo is taken. Documents, agreements and receipts are kept together for each tenancy, and owners keep their own document vault.",
    },
    {
      name: "Monthly money",
      summary:
        "Configure rent per tenancy, generate monthly bills singly or in bulk with proration handled, distribute service charges across flats, record utility readings, and track dues and payments. Every bill revision is kept with a reason; history is never overwritten.",
    },
    {
      name: "Receipts",
      summary:
        "Each recorded payment produces a numbered receipt that the tenant can confirm or dispute, with a printable PDF carrying a QR verification code.",
    },
    {
      name: "Communication",
      summary:
        "Post notices to the whole building, to tenants only, to owners only, or to a single flat, and see who has read them. Notifications are delivered inside the app.",
    },
    {
      name: "Maintenance and facilities",
      summary:
        "Tenants raise complaints and maintenance requests against their own flat; owners assign them, track a timeline with attachments, and close them. Shared facilities can be listed and booked, and parking slots, vehicles and visitor parking are managed in the same place.",
    },
    {
      name: "Staff",
      summary:
        "A directory of building staff with departments, roles and permissions, attendance, shifts, leave and task assignment, plus a simple staff app for the people doing the work.",
    },
    {
      name: "Visibility",
      summary:
        "An owner dashboard across every property, monthly collected-versus-due reports with export, a calendar and timeline of what happened, and a readable audit trail of who changed what.",
    },
  ],

  perspectives: [
    {
      audience: "Building and flat owners",
      detail:
        "Whether you own a whole building or a single flat, you see your properties, your tenants and your money in one dashboard, with co-owners and managers given exactly the access they need.",
    },
    {
      audience: "Tenants",
      detail:
        "Tenants get their own app: bills and service charges, receipts, notices from the building, the ability to raise a maintenance request, book a facility, and keep their documents in one place.",
    },
    {
      audience: "Building staff",
      detail:
        "Caretakers, guards and maintenance staff have a focused app for their tasks, attendance and leave, so work assigned in the office reaches the person doing it.",
    },
  ],

  local: {
    heading: "Designed for how buildings actually work in Bangladesh",
    points: [
      {
        title: "Bangla first, English throughout",
        detail:
          "The product opens in Bangla and offers English with full parity. The language is chosen once and remembered.",
      },
      {
        title: "Real addresses, not free text",
        detail:
          "Addresses are structured on Bangladesh's own geography: divisions, districts, upazilas and thanas, unions, pourashavas and every city corporation, with postal areas reconciled from independent sources rather than guessed.",
      },
      {
        title: "Local money conventions",
        detail:
          "Rent, service charges and utility charges are separate lines with their own rules, dues carry forward, and the common local payment methods can be recorded against a bill.",
      },
      {
        title: "Built for the phone",
        detail:
          "The whole product is designed for a phone screen first, with large touch targets and short flows, because that is where owners, tenants and caretakers actually are.",
      },
    ],
  },

  trust: {
    heading: "Built to be trusted with a building's records",
    points: [
      "Access is enforced by the database for every record, so an owner, tenant or staff member can only ever see what belongs to them.",
      "Financial history is append-only: bills are versioned, revisions require a reason, and receipt and bill numbers are issued without gaps.",
      "Every significant action is written to an audit log that cannot be edited or deleted, and owners can read their own.",
      "Identity document capture runs on the device; the quality checks happen in the browser before anything is uploaded.",
      "Account holders can export their data and request deletion from inside the product.",
    ],
  },

  commercial: {
    heading: "Straightforward pricing",
    detail:
      "Owners subscribe monthly. The package depends only on how many flats are managed, and every package includes the same features. Current packages and prices are published inside Basha OS.",
  },

  cta: {
    primary: { label: "Open Basha OS", href: "https://www.bashaos.com" },
    secondary: {
      label: "Talk to Melbae about Basha OS",
      href: "/contact?topic=basha-os",
    },
  },
} as const;
