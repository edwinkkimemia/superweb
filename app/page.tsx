import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/forms/LeadForm";
import Faq from "@/components/ui/Faq";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Design Kenya | Web Design Nairobi – SuperWeb #1 Web Development Company Kenya",
  description:
    "SuperWeb is Nairobi's trusted website design company in Kenya. Business websites, ecommerce, AI solutions, SEO, mobile apps, cybersecurity, IT support & graphic design. Get a free quote: 0715135141.",
  keywords: [
    "website design Kenya",
    "web design Nairobi",
    "web development company Kenya",
    "ecommerce website development Kenya",
    "AI solutions Kenya",
    "AI chatbot Kenya",
    "SEO services Kenya",
    "mobile app development Kenya",
    "cybersecurity Kenya",
    "IT support Kenya",
    "graphic design Kenya",
    "website design prices Kenya",
  ],
  alternates: { canonical: `${SITE_URL}/` },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SuperWeb",
  url: SITE_URL,
  email: "info@superweb.co.ke",
  telephone: "+254715135141",
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
  areaServed: ["Kenya", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Africa"],
  priceRange: "KSh 35,000 - KSh 1,200,000+",
};

const FAQS = [
  { q: "How much does website design cost in Kenya?", a: "Business websites: KSh 35,000–120,000. Ecommerce: KSh 95,000–350,000. See our transparent pricing page — every quote is fixed in writing." },
  { q: "How long does it take to build a website?", a: "Business sites: 2–3 weeks. Ecommerce: 3–5 weeks. Custom systems: 6–12 weeks. Delivery time is written into your contract." },
  { q: "Do you offer M-Pesa integration?", a: "Yes. Daraja STK Push, paybill/till checkout for ecommerce, plus card payments (Pesapal, DPO, Flutterwave) on request." },
  { q: "Will my website rank on Google?", a: "Every site ships with technical + on-page SEO: fast loading, mobile-first, sitemap, schema markup & keyword-optimised pages." },
  { q: "Do I own my website and domain?", a: "100%. Domain registered in your name, full hosting access, and training so you can update text and photos yourself." },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }} />
      <section className="hero-corporate">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">★ Rated web design company in Nairobi, Kenya</span>
            <h1>
              Website Design in Kenya That Turns Visitors Into <span className="accent">Paying Customers</span>
            </h1>
            <p className="hero-sub">
              SuperWeb builds fast, Google-ready <strong>business websites, ecommerce stores &amp; web
              applications</strong> for ambitious Kenyan companies. Professional web design in Nairobi from{" "}
              <strong>KSh 35,000</strong> — SEO included, M-Pesa ready, delivered in 2–4 weeks.
            </p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary">Get My Free Website Quote →</Link>
              <Link href="/work" className="btn btn-outline" style={{ background: "#fff" }}>See Our Work</Link>
            </div>
            <div className="hero-proof">
              <div><strong>120+</strong>Websites delivered</div>
              <div><strong>2–4 wks</strong>Average delivery</div>
              <div><strong>95+</strong>PageSpeed score</div>
              <div><strong>24 hrs</strong>Quote response</div>
            </div>
          </div>
          <div>
            <div className="quote-card">
              <h3>Get a free website consultation</h3>
              <p className="sub">Tell us about your business. We reply within 24 hours with price &amp; timeline.</p>
              <div style={{ marginTop: 16 }}>
                <LeadForm source="/" compact />
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
                ✓ No obligation ✓ Price in 24hrs ✓ Nairobi-based team
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="trustbar">
        <div className="trustbar-inner">
          <span className="stars">★★★★★</span>
          <span><strong>Trusted by SMEs, corporates &amp; startups</strong> across Nairobi, Mombasa, Kisumu, Nakuru &amp; Eldoret</span>
          <span>·</span><span>M-Pesa Integration</span><span>·</span><span>Google SEO Ready</span><span>·</span><span>1-Year Free Support</span>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <p className="kicker">Website design services Kenya — what we do</p>
          <h2 className="h2">Kenya&apos;s Full-Service Web Design &amp; Development Company</h2>
          <div className="gold-rule" />
          <p className="lead">
            Stop losing customers to competitors with better websites. SuperWeb is a{" "}
            <strong>web development company in Kenya</strong> offering everything your business needs to win
            online — websites, ecommerce, AI, SEO, mobile apps, cybersecurity, IT support and design.
          </p>
          <div className="grid-3">
            {[
              { img: "/images/service-business.jpg", alt: "Business website design Kenya", icon: "🏢", t: "Business Website Design Kenya", d: "Professional company websites from KSh 35,000. Mobile-friendly, fast, with WhatsApp chat, Google Maps & contact forms that convert.", href: "/services/business-websites", cta: "Learn more →" },
              { img: "/images/service-ecommerce.jpg", alt: "Ecommerce website development Kenya with M-Pesa", icon: "🛒", t: "Ecommerce Website Development Kenya", d: "Sell online with M-Pesa, cards & delivery integration. Product catalogues, discounts, stock control & customer accounts.", href: "/services/ecommerce", cta: "Learn more →" },
              { img: "/images/service-ai.jpg", alt: "AI solutions Kenya — chatbots and automation", icon: "🤖", t: "AI Solutions Kenya", d: "WhatsApp AI chatbots, lead qualification & content automation from KSh 60,000. Put your sales team on autopilot.", href: "/services/ai-solutions", cta: "Explore AI →" },
              { img: "/images/service-seo.jpg", alt: "SEO services Kenya", icon: "🚀", t: "SEO Services Kenya", d: 'Rank #1 on Google for "your service + Nairobi/Kenya". Keyword research, on-page SEO, Google Business Profile & monthly reports.', href: "/services/seo", cta: "Learn more →" },
              { img: "/images/service-apps.jpg", alt: "Web application development Kenya", icon: "⚙️", t: "Web Application Development", d: "Custom portals, booking systems, school & hospital management, SACCO systems — built on TypeScript + PostgreSQL.", href: "/services/web-applications", cta: "Learn more →" },
              { img: "/images/service-care.jpg", alt: "Website maintenance Kenya", icon: "🛡️", t: "Website Maintenance Kenya", d: "Monthly updates, backups, security & content changes from KSh 5,000/month. Never worry about hacking or downtime.", href: "/services/care-plans", cta: "Learn more →" },
              { img: "/images/service-apps.jpg", alt: "Mobile app development Kenya", icon: "📱", t: "Mobile App Development", d: "Android & iOS business apps with M-Pesa from KSh 350,000. Design, build, testing and Play Store launch handled.", href: "/services/mobile-apps", cta: "Learn more →" },
              { img: "/images/service-care.jpg", alt: "Cybersecurity services Kenya", icon: "🔒", t: "Cybersecurity Services", d: "Audits, malware cleanup, hardening and monitoring from KSh 45,000. Keep your business safe from hackers.", href: "/services/cybersecurity", cta: "Learn more →" },
              { img: "/images/service-business.jpg", alt: "IT support Kenya", icon: "🖥️", t: "IT Support & Managed IT", d: "Computers, networks, email and backups from KSh 20,000/month. Reliable on-call help for offices and schools.", href: "/services/it-support", cta: "Learn more →" },
              { img: "/images/work-fashion.jpg", alt: "Graphic and visual design Kenya", icon: "🎨", t: "Graphic & Visual Design", d: "Logos, branding, social kits and print from KSh 15,000. Visuals that make your business impossible to ignore.", href: "/services/graphic-design", cta: "Learn more →" },
            ].map((c) => (
              <div className="card" key={c.t}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="svc-img" src={c.img} alt={c.alt} loading="lazy" />
                <div className="icon">{c.icon}</div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <Link className="price-link" href={c.href}>{c.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <p className="kicker">Why SuperWeb — Nairobi web design agency</p>
          <h2 className="h2">Why 120+ Kenyan Businesses Chose SuperWeb</h2>
          <div className="stats-band">
            <div><strong>120+</strong><span>Websites live in Kenya</span></div>
            <div><strong>8 yrs</strong><span>Serving Nairobi &amp; beyond</span></div>
            <div><strong>95+</strong><span>Avg. PageSpeed score</span></div>
            <div><strong>4.9/5</strong><span>Client satisfaction</span></div>
          </div>
          <div className="grid-3">
            <div className="card"><h3>✅ Prices in Kenyan Shillings, No Surprises</h3><p>Clear website design prices in Kenya upfront. Business site from KSh 35,000. Ecommerce from KSh 95,000. Written quotation in 24 hours.</p></div>
            <div className="card"><h3>✅ M-Pesa, SEO &amp; WhatsApp Built-In</h3><p>Every site ships with M-Pesa payment options, on-page SEO for Google Kenya, and WhatsApp click-to-chat.</p></div>
            <div className="card"><h3>✅ You Own Everything</h3><p>Domain, hosting access, source files. No hostage situations. Training + 1-year support included.</p></div>
          </div>
          <CtaBand
            title="Is your current website costing you customers?"
            text="Get a FREE homepage audit + fixed quotation. Call 0715135141 or request online — reply in 24 hours."
            btnLabel="Claim Free Audit →"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="kicker">How it works</p>
          <h2 className="h2">From First Call to Launch in 4 Simple Steps</h2>
          <div className="steps">
            {[
              ["STEP 1", "Free Consultation", "Call 0715135141 or fill the form. We discuss goals, pages & budget."],
              ["STEP 2", "Fixed Quotation", "Written price + timeline in 24hrs. 50% deposit to start."],
              ["STEP 3", "Design & Build", "You approve the homepage design, then we build all pages + SEO."],
              ["STEP 4", "Review & Training", "You test everything. We train you to update content yourself."],
              ["STEP 5", "Launch & Support", "Go live on superweb.co.ke-grade hosting. 1-year free support."],
            ].map(([s, h, p]) => (
              <div className="step" key={h}><strong>{s}</strong><h4>{h}</h4><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <p className="kicker">Website design Kenya — FAQs</p>
          <h2 className="h2">Frequently Asked Questions</h2>
          <Faq items={FAQS} />
        </div>
      </section>
    </>
  );
}
