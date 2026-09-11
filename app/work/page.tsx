import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work – Website Design, Apps & Branding Portfolio Kenya",
  description:
    "See SuperWeb's portfolio Kenya: business websites, ecommerce with M-Pesa, mobile apps, cybersecurity, IT support & branding projects. Your project could be next — 0715135141.",
  alternates: { canonical: `${SITE_URL}/work` },
};

const PROJECTS = [
  { img: "/images/work-fashion.jpg", alt: "Ecommerce website design Kenya - fashion online shop", tag: "Ecommerce · Nairobi", t: "Fashion Online Shop — M-Pesa Checkout", d: "Full ecommerce website development Kenya: catalogue, M-Pesa STK Push, delivery zones & discounts. Result: 3× online orders in 90 days." },
  { img: "/images/work-corporate.jpg", alt: "Corporate website design Nairobi Kenya - financial services", tag: "Corporate · Fintech", t: "Financial Services Corporate Website", d: "Company website design Kenya: services, loan calculator, lead forms & SEO. Result: 5× quote requests." },
  { img: "/images/work-hotel.jpg", alt: "Hotel website design Kenya with booking system", tag: "Hospitality · Booking", t: "Boutique Hotel Website + Booking", d: "Hotel website design Kenya with rooms, gallery, M-Pesa deposits & WhatsApp booking." },
  { img: "/images/work-arch.jpg", alt: "Architecture company website design Kenya", tag: "Professional · Redesign", t: "Architecture Firm Redesign", d: "Rescued a 2014-era site into a fast corporate portfolio with preserved Google rankings." },
  { img: "/images/service-ai.jpg", alt: "AI chatbot for Kenyan business", tag: "AI Solutions · Nairobi", t: "WhatsApp AI Assistant — Auto Lead Capture", d: "AI chatbot trained on business FAQs. Answers instantly in English & Swahili, books appointments & sends hot leads to WhatsApp. Result: 0 missed enquiries." },
  { img: "/images/service-apps.jpg", alt: "Mobile app development Kenya - retail ordering app", tag: "Mobile Apps · Android & iOS", t: "Retail Ordering App — Android & iOS", d: "Mobile app development Kenya: product catalogue, M-Pesa STK Push in-app, order tracking & push notifications. Published to Play Store & App Store with staff training." },
  { img: "/images/service-care.jpg", alt: "Cybersecurity audit and website hardening Kenya", tag: "Cybersecurity · Audit", t: "SACCO Portal Security Audit & Hardening", d: "Cybersecurity services Kenya: full audit, malware cleanup, firewall, 2FA & monitored backups. Result: zero incidents in 12 months." },
  { img: "/images/contact-office.jpg", alt: "Managed IT support for Nairobi office", tag: "IT Support · Managed IT", t: "Law Firm Managed IT Support", d: "IT support Kenya: office network, business email, laptops, printers & automatic backups — with same-day Nairobi response on contract." },
  { img: "/images/service-business.jpg", alt: "Company rebranding and visual identity Kenya", tag: "Branding · Visual Design", t: "Logistics Company Rebrand & Visual Kit", d: "Graphic & visual design Kenya: logo, colours, stationery, social media kit & vehicle branding. One identity across print, web and social." },
];

export default function WorkPage() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Our Work</div>
        <p className="kicker">Websites, apps, security & branding portfolio Kenya</p>
        <h1 className="h2">Recent Projects: Websites, Apps & Brand Work in Kenya</h1>
        <p className="lead">
          A sample of <strong>business websites, ecommerce stores, mobile apps, cybersecurity audits, IT
          support contracts &amp; rebrands</strong> delivered by Nairobi&apos;s SuperWeb team. Every project:
          mobile-first, secure, and built to bring customers.
        </p>
        <div className="work-grid">
          {PROJECTS.map((p) => (
            <div className="work-card" key={p.t}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.alt} loading="lazy" />
              <div className="work-body">
                <span className="tag">{p.tag}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
        <CtaBand
          title="Want results like these for your business?"
          text="Send your current website (or business name). Free audit + fixed KSh quotation in 24 hours."
          btnLabel="Start My Project →"
          btnHref="/quote"
        />
      </div>
    </section>
  );
}
