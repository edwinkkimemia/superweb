export interface ServiceDetail {
  slug: string;
  label: string;
  kicker: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  icon: string;
  price: string;
  priceNote: string;
  timeline: string;
  features: Array<{ icon: string; t: string; d: string }>;
  faqs: Array<{ q: string; a: string }>;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "business-websites",
    label: "Business Websites",
    kicker: "🏢 Company website design Kenya",
    h1: "Business Websites in Kenya That Turn Visitors Into Customers",
    lead: "A professional company website from KSh 35,000 — mobile-first, Google-ready, with WhatsApp chat, contact forms and maps. Live in 2–3 weeks with training and 1-year support included.",
    metaTitle: "Business Website Design Kenya – Company Websites from KSh 35,000",
    metaDescription:
      "Professional business website design Kenya: company sites for SMEs, clinics, law firms & schools from KSh 35,000. Mobile-first, SEO-ready, M-Pesa links. Call 0715135141.",
    keywords: ["business website design Kenya", "company website design Nairobi", "SME website Kenya", "corporate website design Kenya"],
    image: "/images/service-business.jpg",
    imageAlt: "Business website design Kenya",
    icon: "🏢",
    price: "KSh 35,000 – 120,000",
    priceNote: "Fixed written quotation in 24 hours. 50% to start, 50% on launch.",
    timeline: "2–3 weeks",
    features: [
      { icon: "📱", t: "Mobile-First Design", d: "Over 85% of Kenyan browsing is mobile. Your site is designed phone-first, then scaled up." },
      { icon: "💬", t: "WhatsApp Lead Capture", d: "Click-to-chat buttons, quote forms and call tracking turn visits into conversations." },
      { icon: "🔍", t: "Google SEO Included", d: "Keyword-mapped pages, sitemap, schema markup and Google Business Profile setup." },
      { icon: "⚡", t: "95+ PageSpeed", d: "Compressed images, clean code and caching — fast even on 3G connections upcountry." },
      { icon: "🎓", t: "Training + Ownership", d: "You own domain, hosting and files. We train you to edit text and photos yourself." },
      { icon: "🛡️", t: "1-Year Support", d: "Security updates, backups and small fixes free for 12 months after launch." },
    ],
    faqs: [
      { q: "How many pages do I get?", a: "Starter covers 5 pages; Business covers up to 15 plus a blog. Extra pages are quoted per page." },
      { q: "Do you write the content?", a: "We polish your draft into Google-friendly copy. Full copywriting from scratch is available as an add-on." },
      { q: "Will it work with my logo and colours?", a: "Yes — or with our new SuperWeb cyan-to-purple luxury theme if you're rebranding." },
      { q: "Can I upgrade to ecommerce later?", a: "Absolutely. We build on an upgradeable foundation, so M-Pesa checkout can be added anytime." },
    ],
  },
  {
    slug: "ecommerce",
    label: "Ecommerce & M-Pesa",
    kicker: "🛒 Online shops Kenya",
    h1: "Ecommerce Website Development Kenya — Sell 24/7 With M-Pesa",
    lead: "A complete online shop from KSh 95,000: product catalogue, M-Pesa STK Push, cards, delivery zones, discounts and order SMS. Live in 4–5 weeks with staff training included.",
    metaTitle: "Ecommerce Website Development Kenya – Online Shops from KSh 95,000",
    metaDescription:
      "Ecommerce website development Kenya with M-Pesa STK Push, delivery zones and discounts. Online shops from KSh 95,000. Call 0715135141.",
    keywords: ["ecommerce website development Kenya", "online shop Kenya", "M-Pesa ecommerce", "ecommerce website cost Kenya"],
    image: "/images/service-ecommerce.jpg",
    imageAlt: "Ecommerce website development Kenya with M-Pesa",
    icon: "🛒",
    price: "KSh 95,000 – 350,000",
    priceNote: "Scales with product count and integrations. Fixed quote before we start.",
    timeline: "4–5 weeks",
    features: [
      { icon: "📲", t: "M-Pesa STK Push", d: "Daraja-powered checkout plus paybill/till options and card gateways (Pesapal, DPO, Flutterwave)." },
      { icon: "🚚", t: "Delivery Zones", d: "Nairobi, countrywide and pickup-point rates with per-zone pricing rules." },
      { icon: "🏷️", t: "Discounts & Coupons", d: "Flash sales, voucher codes, bulk pricing and abandoned-cart recovery." },
      { icon: "📦", t: "Stock Control", d: "Inventory tracking, low-stock alerts, order SMS and customer accounts." },
      { icon: "🔍", t: "Product SEO", d: "Every product page optimised to rank on Google and Google Shopping." },
      { icon: "🎓", t: "Staff Training", d: "We train your team to add products, process orders and run promotions." },
    ],
    faqs: [
      { q: "Which payments can I accept?", a: "M-Pesa STK Push, till/paybill, plus Visa/Mastercard via Pesapal, DPO or Flutterwave." },
      { q: "How many products fit?", a: "Up to 200 in the standard package; catalogues of thousands are quoted custom." },
      { q: "Who handles delivery?", a: "You do — we configure your zones, rates and rider/dispatch notifications." },
      { q: "Can customers pay on delivery?", a: "Yes, cash/M-Pesa on delivery can sit alongside prepaid checkout." },
    ],
  },
  {
    slug: "ai-solutions",
    label: "AI Solutions",
    kicker: "🤖 AI chatbots & automation Kenya",
    h1: "AI That Answers, Qualifies & Sells — While You Sleep",
    lead: "Practical AI for Kenyan businesses from KSh 60,000: WhatsApp chatbots trained on your products, instant English & Swahili replies, automatic lead capture and review responses. Live in 2–4 weeks.",
    metaTitle: "AI Solutions Kenya – Chatbots, Automation & AI Websites Nairobi",
    metaDescription:
      "SuperWeb AI solutions Kenya: WhatsApp AI chatbots, lead qualification, AI search & content automation for Kenyan businesses. From KSh 60,000. Call 0715135141.",
    keywords: ["AI solutions Kenya", "AI chatbot Kenya", "WhatsApp chatbot Nairobi", "business automation Kenya", "AI website Kenya"],
    image: "/images/service-ai.jpg",
    imageAlt: "AI chatbot solutions Kenya",
    icon: "🤖",
    price: "KSh 60,000 – 150,000",
    priceNote: "Plus KSh 8,000/mo AI Care: usage, tuning and new FAQs. Cancel anytime after 3 months.",
    timeline: "2–4 weeks",
    features: [
      { icon: "💬", t: "WhatsApp AI Assistants", d: "Trained on your price list and FAQs. Replies in seconds, books appointments, sends hot leads to your phone." },
      { icon: "🎯", t: "Lead Qualification", d: "AI asks budget, location and timeline, then routes serious buyers to you." },
      { icon: "✍️", t: "Content Automation", d: "Google-friendly product descriptions, review replies and captions in your brand voice." },
      { icon: "🔍", t: "AI Site Search", d: "Visitors ask in plain language and get answers from your own content." },
      { icon: "📊", t: "Chat Analytics", d: "Every conversation logged with PostgreSQL reporting: top questions, peak hours, conversion." },
      { icon: "🛡️", t: "Safe & Supervised", d: "Guardrails plus human handover on tricky questions. Your data stays yours." },
    ],
    faqs: [
      { q: "Will the AI give wrong answers?", a: "No. It answers only from content you approve. Anything outside that hands over to a human on WhatsApp." },
      { q: "Does it work in Swahili?", a: "Yes — tuned for Kenyan English, Swahili and common Sheng customer phrasing." },
      { q: "Do I need a new website?", a: "No. AI bolts onto your current site and WhatsApp, though it shines brightest on a fast SuperWeb site." },
      { q: "What does it cost monthly?", a: "AI Care is KSh 8,000/month: usage, tuning, new FAQs and reports. Cancel anytime after 3 months." },
    ],
  },
  {
    slug: "seo",
    label: "SEO Services",
    kicker: "🚀 Rank #1 on Google Kenya",
    h1: "SEO Services Kenya — Get Found When Customers Search",
    lead: "Monthly SEO from KSh 25,000: keyword strategy for 'your service + Nairobi/Kenya', technical fixes, content, Google Business Profile and backlinks — with ranking reports you can actually read.",
    metaTitle: "SEO Services Kenya – Rank #1 on Google | SuperWeb Nairobi",
    metaDescription:
      "SEO services Kenya from KSh 25,000/mo: keyword strategy, technical fixes, content and backlinks that rank Kenyan businesses #1 on Google. Call 0715135141.",
    keywords: ["SEO services Kenya", "SEO company Nairobi", "rank on Google Kenya", "Google Business Profile Kenya"],
    image: "/images/service-seo.jpg",
    imageAlt: "SEO services Kenya",
    icon: "🚀",
    price: "KSh 25,000 – 60,000/mo",
    priceNote: "3-month minimum (SEO compounds). Cancel anytime after that.",
    timeline: "Results in 3–6 months",
    features: [
      { icon: "🎯", t: "Keyword Strategy", d: "We target buyer-intent searches like 'posho mill Nairobi' or 'dentist Westlands'." },
      { icon: "🔧", t: "Technical Fixes", d: "Speed, mobile, sitemap, schema and crawl errors — the foundations rankings need." },
      { icon: "✍️", t: "4 Articles Monthly", d: "Location-rich content that answers what your customers actually Google." },
      { icon: "📍", t: "Maps + Reviews", d: "Google Business Profile optimisation and review-generation playbooks." },
      { icon: "🔗", t: "Kenyan Backlinks", d: "Ethical links from relevant local directories, press and partners." },
      { icon: "📊", t: "Monthly Reports", d: "Rankings, traffic and calls — plain language, no vanity metrics." },
    ],
    faqs: [
      { q: "How fast will I rank #1?", a: "Low-competition local terms often move in 6–12 weeks; competitive Nairobi terms take 4–8 months of compounding." },
      { q: "Do you guarantee #1?", a: "No honest agency can — Google forbids guarantees. We guarantee the work, the reporting and steady progress." },
      { q: "Is my website included?", a: "Audits and on-page fixes are included. A slow site may need our redesign first — we'll tell you upfront." },
      { q: "Can I cancel?", a: "Anytime after month 3. You keep all content and improvements." },
    ],
  },
  {
    slug: "web-applications",
    label: "Web Applications",
    kicker: "⚙️ Custom portals & systems",
    h1: "Custom Web Applications — Portals Engineered for Kenyan Business",
    lead: "Booking systems, school portals, hospital records, SACCO dashboards and ERP-lite tools from KSh 250,000 — engineered in Next.js TypeScript + PostgreSQL for speed, security and scale.",
    metaTitle: "Web Application Development Kenya – Custom Portals & Systems",
    metaDescription:
      "Custom web application development Kenya: booking systems, school portals, SACCO dashboards from KSh 250,000. TypeScript + PostgreSQL. Call 0715135141.",
    keywords: ["web application development Kenya", "custom portal Nairobi", "school management system Kenya", "SACCO software Kenya"],
    image: "/images/service-apps.jpg",
    imageAlt: "Web application development Kenya",
    icon: "⚙️",
    price: "KSh 250,000+",
    priceNote: "Scoped fixed-price after a free discovery call. Phased delivery available.",
    timeline: "6–12 weeks",
    features: [
      { icon: "📅", t: "Booking & Scheduling", d: "Clinics, hotels and consultants: calendars, reminders and M-Pesa deposits." },
      { icon: "🏫", t: "School & Hospital Systems", d: "Admissions, records, billing and parent/patient portals with role access." },
      { icon: "🏦", t: "SACCO Dashboards", d: "Member statements, loan tracking and SMS notifications." },
      { icon: "🔐", t: "Security First", d: "Role-based access, audit logs, encrypted backups and tested auth flows." },
      { icon: "📈", t: "Built to Scale", d: "PostgreSQL + TypeScript architecture that grows from 10 to 100,000 users." },
      { icon: "🎓", t: "Handover + Docs", d: "Admin training, documentation and a maintenance plan from day one." },
    ],
    faqs: [
      { q: "How do we start?", a: "A free 45-minute discovery call, then a fixed-price proposal with milestones." },
      { q: "Who owns the code?", a: "You do — full repository access, documentation and deployment guides." },
      { q: "Can it work offline / on slow internet?", a: "We design lightweight interfaces that stay usable on 3G and shared devices." },
      { q: "Do you maintain it after launch?", a: "Yes — care plans from KSh 15,000/mo cover hosting, updates and support." },
    ],
  },
  {
    slug: "care-plans",
    label: "Care Plans",
    kicker: "🛡️ Maintenance & hosting Kenya",
    h1: "Website Care Plans — Never Worry About Hacking or Downtime",
    lead: "From KSh 5,000/month: updates, daily backups, uptime monitoring, hacking recovery, content changes and .co.ke renewals handled for you.",
    metaTitle: "Website Maintenance Kenya – Care Plans from KSh 5,000/mo",
    metaDescription:
      "Website maintenance Kenya: updates, backups, security and content changes from KSh 5,000/month. Sleep easy with SuperWeb care plans. Call 0715135141.",
    keywords: ["website maintenance Kenya", "website care plan Nairobi", "website security Kenya", "domain renewal Kenya"],
    image: "/images/service-care.jpg",
    imageAlt: "Website maintenance Kenya",
    icon: "🛡️",
    price: "KSh 5,000 – 15,000/mo",
    priceNote: "Annual billing saves 2 months. Cancel with 30 days' notice.",
    timeline: "Starts immediately",
    features: [
      { icon: "🔄", t: "Updates Handled", d: "Core, plugin and security patches tested before they touch your live site." },
      { icon: "💾", t: "Daily Backups", d: "Off-site backups with one-click restore. Ransomware-proof peace of mind." },
      { icon: "👁️", t: "Uptime Monitoring", d: "24/7 watches with instant alerts — we usually fix issues before you notice." },
      { icon: "🧹", t: "Hack Cleanup", d: "If the worst happens, malware removal and hardening are included." },
      { icon: "✏️", t: "Content Changes", d: "2–8 text/photo updates monthly depending on your tier." },
      { icon: "🌐", t: "Domain + SSL", d: ".co.ke renewals, DNS and certificates managed so nothing expires." },
    ],
    faqs: [
      { q: "Is hosting included?", a: "Managed hosting is included on Business tier and up; Starter pairs with your existing host." },
      { q: "What if my site gets hacked?", a: "Cleanup and hardening are covered. We restore from clean backups fast." },
      { q: "Can you maintain a site you didn't build?", a: "Yes — after a paid audit (credited if you join a plan)." },
      { q: "How do I request changes?", a: "WhatsApp, email or the client portal. Standard turnaround is 48 hours." },
    ],
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
