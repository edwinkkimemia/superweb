# SuperWeb 🇰🇪 — Website Design Kenya

Luxurious, SEO-driven website for **SuperWeb**, Nairobi's web design company.
**Stack:** Next.js 14 TypeScript (App Router) + Node + PostgreSQL.

Positioning: **Website Design Kenya | Web Design Nairobi | Ecommerce, AI Solutions & SEO that bring customers.**

## Quick start

```bash
npm install
copy .env.example .env   # bash: cp .env.example .env
npm run dev              # http://localhost:3000
```

## Project structure (modern Next.js)

```
superweb/
├── app/                      # Routes — every page is a .tsx TypeScript module
│   ├── layout.tsx            # Root layout (fonts, header, footer, SEO defaults)
│   ├── page.tsx              # / — home (hero bg image, services, AI spotlight, FAQs)
│   ├── services/
│   │   ├── page.tsx          # /services — 7 services with photography
│   │   └── ai-solutions/     # /services/ai-solutions — AI chatbots & automation
│   ├── work/page.tsx         # /work — portfolio with local imagery
│   ├── pricing/page.tsx      # /pricing — KSh packages + AI add-on
│   ├── about/page.tsx        # /about — (kept, not in nav)
│   ├── contact/page.tsx      # /contact — quote form + office photo
│   ├── admin/page.tsx        # /admin — private CRM (noindex)
│   ├── api/                  # Route Handlers (Node + pg): health, leads, stats, projects
│   ├── sitemap.ts robots.ts  # SEO metadata routes
│   └── globals.css           # Corporate + luxury champagne-gold layer
├── components/
│   ├── layout/               # Header (services dropdown nav), Footer
│   ├── forms/LeadForm.tsx    # "use client" quote form → POST /api/leads
│   ├── ui/                   # CtaBand, Faq
│   ├── admin/AdminDashboard.tsx
│   └── sections/             # (page-specific sections as site grows)
├── lib/                      # db.ts (pg pool + leads API), types.ts, site.ts
├── data/services.ts          # Central services catalogue (nav, pages, forms)
├── db/schema.sql             # PostgreSQL schema
└── public/images/            # hero-bg + service / portfolio / office photography
```

## Pages & keywords

| URL | Source | Target keywords |
|---|---|---|
| `/` | `app/page.tsx` | website design Kenya, web design Nairobi |
| `/services` | `app/services/page.tsx` | business website design, ecommerce, AI, SEO Kenya |
| `/services/ai-solutions` | `app/services/ai-solutions/page.tsx` | AI solutions Kenya, WhatsApp chatbot Nairobi |
| `/work` | `app/work/page.tsx` | website design portfolio Kenya |
| `/pricing` | `app/pricing/page.tsx` | website design prices Kenya |
| `/contact` | `app/contact/page.tsx` | get website quote Kenya, 0717135141 |
| `/admin` | `app/admin/page.tsx` | private lead CRM (`noindex`) |

## Admin dashboard

1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` (or leave both empty for open dev mode).
2. Open `http://localhost:3000/admin`, sign in with email + password.
3. Stats, search/filter, stage updates (new → contacted → quoted → won/lost), CSV export.

Without `DATABASE_URL` the API runs in memory mode. With Postgres:

```bash
createdb superweb
psql $DATABASE_URL -f db/schema.sql
```

## Brand & contact

SuperWeb · superweb.co.ke · info@superweb.co.ke · 0717135141 · Nairobi, Kenya.
