import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Design Prices Kenya 2026 – Cost of Website Design in Nairobi",
  description:
    "Transparent website design prices in Kenya 2026: business websites from KSh 35,000, ecommerce from KSh 95,000, SEO from KSh 25,000/mo. Fixed quotes in 24hrs. Call 0715135141.",
  keywords: ["website design prices Kenya", "cost of website design in Kenya", "ecommerce website cost Kenya", "SEO prices Kenya"],
  alternates: { canonical: `${SITE_URL}/pricing` },
};

export default function PricingPage() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Pricing</div>
        <p className="kicker">Website design prices Kenya 2026 — no hidden fees</p>
        <h1 className="h2">How Much Does a Website Cost in Kenya? Transparent Prices.</h1>
        <p className="lead">
          Every SuperWeb project includes <strong>mobile design, on-page SEO, WhatsApp chat, Google setup,
          training &amp; 1-year support</strong>. 50% to start, 50% on launch.
        </p>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>🟦 STARTER — Business Website</h3>
            <div className="amount">KSh 35,000 <small>one-time</small></div>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>For new SMEs, clinics, churches, personal brands.</p>
            <ul><li>Up to 5 pages</li><li>Mobile-first corporate design</li><li>WhatsApp chat + contact forms</li><li>Basic Google SEO setup</li><li>Training included</li><li>Delivery: 2 weeks</li></ul>
            <Link href="/contact" className="btn btn-navy" style={{ justifyContent: "center" }}>Choose Starter →</Link>
          </div>
          <div className="price-card featured">
            <div className="price-badge">MOST POPULAR ★</div>
            <h3>🟧 BUSINESS — Company Website</h3>
            <div className="amount">KSh 75,000 <small>one-time</small></div>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>For SMEs &amp; corporates that want Google customers.</p>
            <ul><li>Up to 15 pages + blog</li><li>Premium design + copywriting polish</li><li>Advanced SEO (10 keywords, schema)</li><li>Google Business Profile + Analytics</li><li>M-Pesa links + quote forms</li><li>1-year priority support</li><li>Delivery: 3 weeks</li></ul>
            <Link href="/contact" className="btn btn-primary" style={{ justifyContent: "center" }}>Choose Business →</Link>
          </div>
          <div className="price-card">
            <h3>🟩 ECOMMERCE — Online Shop</h3>
            <div className="amount">KSh 95,000 <small>from</small></div>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Sell online with M-Pesa &amp; delivery.</p>
            <ul><li>Up to 200 products</li><li>M-Pesa STK Push + cards</li><li>Delivery zones, discounts</li><li>Order SMS + accounts</li><li>Product SEO</li><li>Delivery: 4–5 weeks</li></ul>
            <Link href="/contact" className="btn btn-navy" style={{ justifyContent: "center" }}>Choose Ecommerce →</Link>
          </div>
        </div>
        <div className="grid-2">
          <div className="card"><h3>🚀 SEO Retainer — Rank on Google Kenya</h3><p><strong>KSh 25,000 – 60,000/month.</strong> Keyword plan, 4 articles/mo, technical fixes, backlinks &amp; monthly reports.</p></div>
          <div className="card"><h3>🤖 AI Solutions — Chatbots &amp; Automation</h3><p><strong>KSh 60,000 – 150,000</strong> one-time + <strong>KSh 8,000/mo</strong> care. WhatsApp AI assistants, lead qualification &amp; review automation.</p><Link className="price-link" href="/services/ai-solutions">Explore AI →</Link></div>
          <div className="card"><h3>📱 Mobile Apps — Android &amp; iOS</h3><p><strong>KSh 350,000+</strong> M-Pesa in-app payments, push notifications, offline-first. Play Store &amp; App Store launch handled.</p><Link className="price-link" href="/services/mobile-apps">View mobile apps →</Link></div>
          <div className="card"><h3>🔒 Cybersecurity — Audits &amp; Protection</h3><p><strong>KSh 45,000 – 180,000.</strong> Security audits, malware cleanup, hardening, backups &amp; monitoring.</p><Link className="price-link" href="/services/cybersecurity">View cybersecurity →</Link></div>
          <div className="card"><h3>🖥️ IT Support — Managed IT</h3><p><strong>KSh 20,000 – 80,000/month.</strong> Computers, networks, Wi-Fi, business email, backups &amp; on-call help.</p><Link className="price-link" href="/services/it-support">View IT support →</Link></div>
          <div className="card"><h3>🎨 Graphic &amp; Visual Design</h3><p><strong>KSh 15,000 – 120,000.</strong> Logos, brand kits, social media kits, packaging &amp; print. You own all files.</p><Link className="price-link" href="/services/graphic-design">View design →</Link></div>
          <div className="card"><h3>🛡️ Care Plan — Maintenance &amp; Hosting</h3><p><strong>KSh 5,000 – 15,000/month.</strong> Updates, daily backups, security, uptime monitoring &amp; content changes.</p></div>
        </div>
        <CtaBand title="Need an exact figure today?" text="Fixed written quotation in 24 hours — valid 30 days." btnLabel="Get Exact Quote →" />
      </div>
    </section>
  );
}
