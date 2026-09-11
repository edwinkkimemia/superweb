import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/forms/LeadForm";
import Faq from "@/components/ui/Faq";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Quote – Website, App & Design Prices Kenya | SuperWeb",
  description:
    "Get a free fixed quote in 24 hours: business websites from KSh 35,000, ecommerce from KSh 95,000, mobile apps, cybersecurity, IT support & design. 2-minute form. Call 0715135141.",
  keywords: [
    "website quote Kenya",
    "website design quotation Nairobi",
    "ecommerce quote Kenya",
    "mobile app quote Kenya",
  ],
  alternates: { canonical: `${SITE_URL}/quote` },
};

const FAQS = [
  { q: "How fast will I get my quote?", a: "Within 24 hours — usually same business day. It lists a fixed KSh price, timeline and exactly what's included. Valid for 30 days." },
  { q: "Is the quote really free?", a: "Yes. No obligation, no pushy follow-ups. If we're not the right fit, we'll tell you honestly." },
  { q: "What do you need from me?", a: "Just the 2-minute form: your business, the service you need and a rough budget. We handle the rest and may ask one or two follow-up questions on WhatsApp." },
  { q: "Can I get a quote on WhatsApp instead?", a: "Absolutely — tap the green WhatsApp button and say what you need. Same fixed pricing, same 24-hour turnaround." },
];

export default function QuotePage() {
  return (
    <>
      <section className="hero-corporate">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">★ Free fixed quote — reply in 24 hours</span>
            <h1>
              Get Your Free Fixed Quote in <span className="accent">2 Minutes</span>
            </h1>
            <p className="hero-sub">
              Tell us what you need — a <strong>website, online shop, mobile app, cybersecurity audit, IT
              support or branding</strong> — and get an exact KSh price plus timeline. No obligation, no
              guesswork.
            </p>
            <div className="hero-proof">
              <div><strong>24 hrs</strong>Quote response</div>
              <div><strong>Fixed KSh</strong>No hidden fees</div>
              <div><strong>120+</strong>Projects delivered</div>
            </div>
          </div>
          <div>
            <div className="quote-card">
              <h3>Request my free quote →</h3>
              <p className="sub">2 minutes. Fixed KSh price in 24 hours. No spam, ever.</p>
              <div style={{ marginTop: 16 }}>
                <LeadForm source="/quote" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">What happens next</p>
          <h2 className="h2">From Quote Request to Launch</h2>
          <div className="gold-rule" />
          <div className="steps">
            {[
              ["STEP 1", "You Send the Form", "2 minutes. Tell us about your business and what you need."],
              ["STEP 2", "Fixed Quotation", "Written KSh price + timeline within 24 hours. Valid 30 days."],
              ["STEP 3", "50% to Start", "Approve the quote, pay half, and we begin immediately."],
              ["STEP 4", "Review & Approve", "You review real progress links and request changes."],
              ["STEP 5", "Launch & Support", "Go live with training + 1-year free support included."],
            ].map(([s, h, p]) => (
              <div className="step" key={h}><strong>{s}</strong><h4>{h}</h4><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <p className="kicker">Starting prices — quote page Kenya</p>
          <h2 className="h2">What Things Cost (Ballpark)</h2>
          <div className="grid-3">
            <div className="card"><h3>🏢 Business Websites</h3><p><strong>From KSh 35,000.</strong> 5–15 pages, mobile-first, WhatsApp chat, Google SEO.</p><Link className="price-link" href="/services/business-websites">Details →</Link></div>
            <div className="card"><h3>🛒 Ecommerce + M-Pesa</h3><p><strong>From KSh 95,000.</strong> Catalogue, STK Push, delivery zones, discounts.</p><Link className="price-link" href="/services/ecommerce">Details →</Link></div>
            <div className="card"><h3>📱 Mobile Apps</h3><p><strong>From KSh 350,000.</strong> Android &amp; iOS with M-Pesa, store launch handled.</p><Link className="price-link" href="/services/mobile-apps">Details →</Link></div>
          </div>
          <p style={{ marginTop: 18 }}>
            <Link className="price-link" href="/pricing">See full pricing →</Link>
            {" · "}
            <Link className="price-link" href="/services">All 10 services →</Link>
          </p>
          <CtaBand
            title="Rather talk it through first?"
            text="Book a free 20-minute call. We'll scope your project live and send the written quote after."
            btnLabel="Schedule Free Meeting →"
            btnHref="/schedule"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">Quote FAQs</p>
          <h2 className="h2">Questions, Answered</h2>
          <Faq items={FAQS} />
          <p style={{ marginTop: 18, color: "var(--muted)" }}>
            Just saying hello? <Link href="/contact" style={{ color: "var(--blue)", fontWeight: 700 }}>Contact us here →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
