import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services – Website Design, Ecommerce, AI & SEO Kenya",
  description:
    "Full list of SuperWeb services: business website design Kenya, ecommerce website development Kenya, AI solutions Nairobi, SEO services, company rebranding, web applications & maintenance. Prices from KSh 35,000.",
  alternates: { canonical: `${SITE_URL}/services` },
};

const SERVICES = [
  { id: "business-websites", img: "/images/service-business.jpg", alt: "Business website design Kenya", icon: "🏢", t: "1. Business & Company Website Design Kenya", d: "From KSh 35,000 · 2–3 weeks. The #1 choice for SMEs, law firms, clinics, schools, churches, hotels & corporates. 5–15 pages, mobile-first, contact forms, WhatsApp chat, Google Maps, blog & on-page SEO.", cta: "View service →", href: "/services/business-websites" },
  { id: "ecommerce", img: "/images/service-ecommerce.jpg", alt: "Ecommerce website development Kenya", icon: "🛒", t: "2. Ecommerce Website Development Kenya", d: "From KSh 95,000 · 3–5 weeks. Sell 24/7 with M-Pesa STK Push, cards, delivery zones, discounts, stock & order SMS. Training included.", cta: "View service →", href: "/services/ecommerce" },
  { id: "ai-solutions", img: "/images/service-ai.jpg", alt: "AI solutions Kenya", icon: "🤖", t: "3. AI Solutions — Chatbots & Automation", d: "From KSh 60,000 · 2–4 weeks. WhatsApp AI assistants that answer questions & capture leads 24/7, AI search, review replies & sales automation for Kenyan businesses.", cta: "Explore AI solutions →", href: "/services/ai-solutions" },
  { id: "seo", img: "/images/service-seo.jpg", alt: "SEO services Kenya", icon: "🚀", t: "4. SEO Services Kenya — Rank #1 on Google", d: "From KSh 25,000/month. Keyword strategy, technical fixes, content, Google Business Profile & backlinks. Monthly ranking reports. Cancel anytime.", cta: "View service →", href: "/services/seo" },
  { id: "web-applications", img: "/images/service-apps.jpg", alt: "Web application development Kenya", icon: "⚙️", t: "5. Custom Web Applications & Portals", d: "From KSh 250,000. Booking systems, school portals, hospital records, SACCO dashboards — engineered in TypeScript + PostgreSQL.", cta: "View service →", href: "/services/web-applications" },
  { id: "redesign", img: "/images/work-arch.jpg", alt: "Website redesign Kenya", icon: "🎨", t: "6. Website Redesign & Rebranding", d: "From KSh 45,000. We rescue slow, ugly, non-mobile Kenyan company websites. SEO preservation, fresh luxurious look in 3 weeks.", cta: "See redesigns →", href: "/work" },
  { id: "care", img: "/images/service-care.jpg", alt: "Website maintenance Kenya", icon: "🛡️", t: "7. Website Maintenance & Hosting Kenya", d: "From KSh 5,000/month. Updates, daily backups, uptime monitoring, hacking recovery & .co.ke domain management.", cta: "View service →", href: "/services/care-plans" },
];

export default function ServicesPage() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Services</div>
        <p className="kicker">Web design services Nairobi, Kenya</p>
        <h1 className="h2">Website Design Services in Kenya — Everything Your Business Needs to Win Online</h1>
        <div className="gold-rule" />
        <p className="lead">
          One partner for <strong>website design Kenya, ecommerce development, AI solutions, Google SEO and
          maintenance</strong>.
          Fixed prices in KSh, contracts, and results you can measure in calls, WhatsApps and M-Pesa sales.
        </p>
        <div className="grid-2">
          {SERVICES.map((s) => (
            <div className="card" key={s.t} id={s.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="svc-img" src={s.img} alt={s.alt} loading="lazy" />
              <div className="icon">{s.icon}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <Link className="price-link" href={s.href}>{s.cta}</Link>
            </div>
          ))}
        </div>
        <CtaBand
          title="Not sure which service you need?"
          text="Describe your business in 2 minutes. We recommend the cheapest option that actually works — free, no pressure."
          btnLabel="Get Free Advice →"
        />
      </div>
    </section>
  );
}
