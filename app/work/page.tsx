import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work – Website Design Portfolio Kenya",
  description:
    "See SuperWeb's website design portfolio Kenya: business websites Nairobi, ecommerce stores with M-Pesa, corporate redesigns & web portals. Your project could be next — 0715135141.",
  alternates: { canonical: `${SITE_URL}/work` },
};

const PROJECTS = [
  { img: "/images/work-fashion.jpg", alt: "Ecommerce website design Kenya - fashion online shop", tag: "Ecommerce · Nairobi", t: "Fashion Online Shop — M-Pesa Checkout", d: "Full ecommerce website development Kenya: catalogue, M-Pesa STK Push, delivery zones & discounts. Result: 3× online orders in 90 days." },
  { img: "/images/work-corporate.jpg", alt: "Corporate website design Nairobi Kenya - financial services", tag: "Corporate · Fintech", t: "Financial Services Corporate Website", d: "Company website design Kenya: services, loan calculator, lead forms & SEO. Result: 5× quote requests." },
  { img: "/images/work-hotel.jpg", alt: "Hotel website design Kenya with booking system", tag: "Hospitality · Booking", t: "Boutique Hotel Website + Booking", d: "Hotel website design Kenya with rooms, gallery, M-Pesa deposits & WhatsApp booking." },
  { img: "/images/work-arch.jpg", alt: "Architecture company website design Kenya", tag: "Professional · Redesign", t: "Architecture Firm Redesign", d: "Rescued a 2014-era site into a fast corporate portfolio with preserved Google rankings." },
  { img: "/images/service-ai.jpg", alt: "AI chatbot for Kenyan business", tag: "AI Solutions · Nairobi", t: "WhatsApp AI Assistant — Auto Lead Capture", d: "AI chatbot trained on business FAQs. Answers instantly in English & Swahili, books appointments & sends hot leads to WhatsApp. Result: 0 missed enquiries." },
];

export default function WorkPage() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Our Work</div>
        <p className="kicker">Website design portfolio Kenya</p>
        <h1 className="h2">Recent Website Design Projects in Kenya</h1>
        <p className="lead">
          A sample of <strong>business websites, ecommerce stores &amp; corporate redesigns</strong> delivered by
          Nairobi&apos;s SuperWeb team. Every project: mobile-first, SEO-ready, M-Pesa capable.
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
        />
      </div>
    </section>
  );
}
