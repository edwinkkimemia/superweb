import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/ui/CtaBand";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About SuperWeb – Web Design Company Nairobi, Kenya",
  description:
    "SuperWeb is a Nairobi-based web design company in Kenya: 8+ years, 120+ websites, TypeScript + PostgreSQL engineering, transparent KSh pricing and 1-year support. Call 0715135141.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / About</div>
        <p className="kicker">Web design company Nairobi — since 2018</p>
        <h1 className="h2">A Nairobi Web Design Company Obsessed With Your Revenue, Not Awards</h1>
        <div className="gold-rule" />
        <p className="lead">
          SuperWeb exists for one reason: <strong>help Kenyan businesses win customers online</strong>. No jargon.
          No disappearing freelancers. Just corporate-grade <strong>website design Kenya</strong>, honest KSh
          pricing and support.
        </p>
        <div className="img-band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about-team.jpg" alt="SuperWeb web design team Nairobi Kenya" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/contact-office.jpg" alt="SuperWeb studio Nairobi" />
        </div>
        <div className="stats-band">
          <div><strong>2018</strong><span>Founded in Nairobi</span></div>
          <div><strong>120+</strong><span>Projects delivered</span></div>
          <div><strong>15+</strong><span>Industries served</span></div>
          <div><strong>100%</strong><span>Ownership to you</span></div>
        </div>
        <div className="grid-2">
          <div className="card"><h3>🏛️ How we work (corporate &amp; reliable)</h3><p>Written proposal → contract → 50% deposit → weekly progress links → approval → training → launch → 1-year support. KRA-compliant invoices, NDA on request.</p></div>
          <div className="card"><h3>💻 Serious engineering underneath</h3><p>Modern stack: <strong>Next.js TypeScript + PostgreSQL</strong>, 95+ PageSpeed, daily backups, SSL, schema markup.</p></div>
          <div className="card"><h3>📍 Kenyan context, global standards</h3><p>M-Pesa-first checkout, fast on 3G, support in English/Swahili on phone, WhatsApp and email.</p></div>
          <div className="card"><h3>🤝 Who we serve</h3><p>SMEs, law firms, clinics, schools, hotels, churches, NGOs, ecommerce shops, SACCOs and corporates across Kenya and diaspora.</p></div>
        </div>
        <CtaBand title="Meet us before you commit." text="Free 20-minute call or Nairobi office visit. We will tell you honestly if you even need a new website." btnLabel="Book Free Call →" btnHref="/schedule" />
      </div>
    </section>
  );
}
