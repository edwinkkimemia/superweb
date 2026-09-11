import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/forms/LeadForm";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us – Questions, Support & Partnerships | SuperWeb Nairobi",
  description:
    "Contact SuperWeb Nairobi: questions about our work, support on an existing project or partnerships. Call 0715135141 or send a message — same-day reply. For prices, get a free quote.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Contact</div>
        <p className="kicker">Contact SuperWeb Nairobi — same-day reply</p>
        <h1 className="h2">Questions, Support & Partnerships</h1>
        <div className="gold-rule" />
        <p className="lead">
          Call, WhatsApp or send the form about <strong>anything that isn&apos;t a price quote</strong> —
          support on an existing project, questions about our work, or partnership ideas.{" "}
          <strong>Need a price?</strong> <Link href="/quote" style={{ color: "var(--blue)", fontWeight: 800 }}>Get a free quote in 2 minutes →</Link>
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
            <h3>Send us a message →</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "6px 0 16px" }}>
              Same-day reply. No spam, ever. Want prices instead? <Link href="/quote" style={{ color: "var(--blue)", fontWeight: 700 }}>Get a free quote →</Link>
            </p>
            <LeadForm source="/contact" projectType="General Enquiry" />
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>
              By sending, you agree to be contacted about your project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
