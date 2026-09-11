import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/forms/LeadForm";
import Faq from "@/components/ui/Faq";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FREE Homepage Audit – Is Your Website Losing Customers? | SuperWeb",
  description:
    "Claim a FREE homepage audit (worth KSh 15,000): speed, mobile, Google SEO, M-Pesa readiness + fixed quote to fix it. Limited slots each month. SuperWeb Nairobi — 0715135141.",
  alternates: { canonical: `${SITE_URL}/offer` },
};

const FAQS = [
  { q: "What exactly do I get?", a: "A plain-language report on your homepage: loading speed, mobile experience, Google visibility, trust signals and M-Pesa readiness — plus a fixed KSh quote to fix what's broken. Worth KSh 15,000, free this month." },
  { q: "How do I claim it?", a: "Send the 1-minute form with your website address (or business name if you have no site yet). We deliver your audit within 48 hours by WhatsApp or email." },
  { q: "Is there a catch?", a: "None. No obligation to hire us. Most businesses do after seeing the report — but the audit is yours to keep either way." },
  { q: "What if I don't have a website yet?", a: "Even better — claim the audit and we'll assess your Google presence (maps, reviews, socials) plus quote your new website from KSh 35,000." },
];

export default function OfferPage() {
  return (
    <>
      <section className="hero-corporate">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">🔥 Limited slots — free audit worth KSh 15,000</span>
            <h1>
              Is Your Website Quietly Losing You <span className="accent">Customers?</span>
            </h1>
            <p className="hero-sub">
              Get a <strong>FREE expert audit of your homepage</strong>: speed, mobile, Google ranking,
              trust signals &amp; M-Pesa readiness — with a fixed quote to fix it all. Delivered in{" "}
              <strong>48 hours</strong>. No obligation.
            </p>
            <div className="hero-proof">
              <div><strong>48 hrs</strong>Audit delivery</div>
              <div><strong>KSh 0</strong>100% free</div>
              <div><strong>120+</strong>Sites reviewed</div>
            </div>
          </div>
          <div>
            <div className="quote-card">
              <h3>Claim my FREE audit →</h3>
              <p className="sub">1 minute. Just your website + WhatsApp number. Slots are limited monthly.</p>
              <div style={{ marginTop: 16 }}>
                <LeadForm source="/offer" compact projectType="General Enquiry" />
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
                ✓ No obligation ✓ Keep the report ✓ Reply in 48hrs
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="trustbar">
        <div className="trustbar-inner">
          <span className="stars">★★★★★</span>
          <span><strong>120+ Kenyan businesses audited &amp; upgraded</strong> — SMEs, clinics, schools, shops &amp; corporates</span>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <p className="kicker">What we check — free audit Kenya</p>
          <h2 className="h2">5 Checks That Decide Whether Visitors Buy or Bounce</h2>
          <div className="gold-rule" />
          <div className="grid-3">
            {[
              { icon: "⚡", t: "Speed Test", d: "Does your homepage load in under 3 seconds on a typical Kenyan phone? Every extra second kills enquiries." },
              { icon: "📱", t: "Mobile Experience", d: "85% of your visitors are on phones. We check taps, text size, buttons and forms thumb-by-thumb." },
              { icon: "🔍", t: "Google Visibility", d: "Do you appear when customers search 'your service + Nairobi'? We check rankings, maps and reviews." },
              { icon: "🤝", t: "Trust Signals", d: "Photos, testimonials, prices, contacts — the proof that turns sceptical visitors into callers." },
              { icon: "📲", t: "M-Pesa Readiness", d: "Can customers pay or enquire in one tap? We check checkout, till links and WhatsApp capture." },
              { icon: "💰", t: "Fixed Quote to Fix It", d: "Every finding comes with an exact KSh price and timeline. No ranges, no surprises." },
            ].map((c) => (
              <div className="card" key={c.t}>
                <div className="icon">{c.icon}</div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h2 className="h2">Your Audit in 3 Easy Steps</h2>
          <div className="steps">
            {[
              ["STEP 1", "Claim (1 Minute)", "Send the form above with your website or business name."],
              ["STEP 2", "We Audit (48 Hours)", "A senior consultant reviews your site against 30+ checkpoints."],
              ["STEP 3", "You Get the Report", "Plain-language findings + fixed KSh quote, via WhatsApp or email."],
            ].map(([s, h, p]) => (
              <div className="step" key={h}><strong>{s}</strong><h4>{h}</h4><p>{p}</p></div>
            ))}
          </div>
          <CtaBand
            title="Like what the audit reveals?"
            text="Turn findings into customers with a fixed-price project — or start with an exact quote today."
            btnLabel="Get Exact Quote →"
            btnHref="/quote"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">Free audit FAQs</p>
          <h2 className="h2">Before You Claim</h2>
          <Faq items={FAQS} />
          <p style={{ marginTop: 18, color: "var(--muted)" }}>
            Ready for full pricing instead? <Link href="/quote" style={{ color: "var(--blue)", fontWeight: 700 }}>Get a free quote →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
