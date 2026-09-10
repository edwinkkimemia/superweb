import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/forms/LeadForm";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us – Get a Free Website Quote in Kenya | 0715135141",
  description:
    "Contact SuperWeb Nairobi for website design Kenya quotes: call 0715135141, email info@superweb.co.ke or request online. Fixed KSh price + timeline in 24 hours. Free homepage audit.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Contact</div>
        <p className="kicker">Get a free website quote Kenya — reply in 24hrs</p>
        <h1 className="h2">Talk to Nairobi&apos;s Website Experts Today</h1>
        <div className="gold-rule" />
        <p className="lead">
          Call, WhatsApp or send the form. A senior consultant replies with <strong>price, timeline and honest
          advice</strong> for your <strong>website design, ecommerce, AI or SEO project in Kenya</strong>.
        </p>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>📞 Prefer to talk?</h3>
            <div className="info-row"><p>CALL / WHATSAPP (8am–8pm EAT)</p><Link className="big" href={PHONE_HREF}>{PHONE_DISPLAY}</Link></div>
            <div className="info-row"><p>EMAIL (reply same day)</p><Link className="big" href={`mailto:${EMAIL}`}>{EMAIL}</Link></div>
            <div className="info-row"><p>OFFICE</p><p style={{ color: "#fff", fontWeight: 700 }}>Nairobi, Kenya · on-site &amp; remote countrywide</p></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/contact-office.jpg" alt="SuperWeb office Nairobi" style={{ borderRadius: 12, marginTop: 18, border: "1px solid rgba(255,255,255,.2)" }} />
          </div>
          <div className="form-card">
            <h3>Get my free quote →</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "6px 0 16px" }}>
              2 minutes. Fixed KSh price in 24 hours. No spam, ever.
            </p>
            <LeadForm source="/contact" />
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
              By sending, you agree to be contacted about your project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
