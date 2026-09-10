import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services – Websites, Apps, Cybersecurity, IT & Design Kenya",
  description:
    "Full list of SuperWeb services: business websites, ecommerce, AI solutions, SEO, web applications, mobile apps, cybersecurity, IT support, graphic & visual design and maintenance. Prices in KSh.",
  alternates: { canonical: `${SITE_URL}/services` },
};

const SERVICES = [
  { id: "business-websites", img: "/images/service-business.jpg", alt: "Business website design Kenya", icon: "🏢", t: "1. Business & Company Website Design Kenya", d: "From KSh 35,000 · 2–3 weeks. The #1 choice for SMEs, law firms, clinics, schools, churches, hotels & corporates. 5–15 pages, mobile-first, contact forms, WhatsApp chat, Google Maps, blog & on-page SEO.", cta: "View service →", href: "/services/business-websites" },
  { id: "ecommerce", img: "/images/service-ecommerce.jpg", alt: "Ecommerce website development Kenya", icon: "🛒", t: "2. Ecommerce Website Development Kenya", d: "From KSh 95,000 · 3–5 weeks. Sell 24/7 with M-Pesa STK Push, cards, delivery zones, discounts, stock & order SMS. Training included.", cta: "View service →", href: "/services/ecommerce" },
  { id: "ai-solutions", img: "/images/service-ai.jpg", alt: "AI solutions Kenya", icon: "🤖", t: "3. AI Solutions — Chatbots & Automation", d: "From KSh 60,000 · 2–4 weeks. WhatsApp AI assistants that answer questions & capture leads 24/7, AI search, review replies & sales automation for Kenyan businesses.", cta: "Explore AI solutions →", href: "/services/ai-solutions" },
  { id: "seo", img: "/images/service-seo.jpg", alt: "SEO services Kenya", icon: "🚀", t: "4. SEO Services Kenya — Rank #1 on Google", d: "From KSh 25,000/month. Keyword strategy, technical fixes, content, Google Business Profile & backlinks. Monthly ranking reports. Cancel anytime.", cta: "View service →", href: "/services/seo" },
  { id: "web-applications", img: "/images/service-apps.jpg", alt: "Web application development Kenya", icon: "⚙️", t: "5. Custom Web Applications & Portals", d: "From KSh 250,000. Booking systems, school portals, hospital records, SACCO dashboards — engineered in TypeScript + PostgreSQL.", cta: "View service →", href: "/services/web-applications" },
  { id: "mobile-apps", img: "/images/service-apps.jpg", alt: "Mobile app development Kenya", icon: "📱", t: "6. Mobile App Development — Android & iOS", d: "From KSh 350,000 · 8–16 weeks. Business apps, ecommerce apps with M-Pesa, booking apps and portals. Play Store & App Store launch handled.", cta: "View service →", href: "/services/mobile-apps" },
  { id: "cybersecurity", img: "/images/service-care.jpg", alt: "Cybersecurity services Kenya", icon: "🔒", t: "7. Cybersecurity — Audits & Protection", d: "From KSh 45,000. Security audits, malware cleanup, hardening, SSL, backups, staff training and 24/7 monitoring for Kenyan SMEs and corporates.", cta: "View service →", href: "/services/cybersecurity" },
  { id: "it-support", img: "/images/service-business.jpg", alt: "IT support Kenya", icon: "🖥️", t: "8. IT Support & Managed IT Services", d: "From KSh 20,000/month. Computers, networks, Wi-Fi, business email, backups and on-call help for offices, schools and clinics.", cta: "View service →", href: "/services/it-support" },
  { id: "graphic-design", img: "/images/work-fashion.jpg", alt: "Graphic and visual design Kenya", icon: "🎨", t: "9. Graphic & Visual Design — Branding", d: "From KSh 15,000. Logos, brand kits, social media kits, packaging, company profiles and print design. You own all source files.", cta: "View service →", href: "/services/graphic-design" },
  { id: "care", img: "/images/service-care.jpg", alt: "Website maintenance Kenya", icon: "🛡️", t: "10. Website Maintenance & Hosting Kenya", d: "From KSh 5,000/month. Updates, daily backups, uptime monitoring, hacking recovery & .co.ke domain management.", cta: "View service →", href: "/services/care-plans" },
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
