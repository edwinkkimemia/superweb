import type { Metadata } from "next";
import Link from "next/link";
import ScheduleForm from "@/components/forms/ScheduleForm";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, SITE_URL, WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule a Free Meeting – Web Design Consultation Kenya",
  description:
    "Book a free 20-minute meeting with SuperWeb Nairobi: video call, phone call or office visit. Website, ecommerce, AI and SEO advice with a fixed KSh quote. Call 0715135141.",
  keywords: ["schedule meeting web design Kenya", "free website consultation Nairobi", "book web designer Kenya"],
  alternates: { canonical: `${SITE_URL}/schedule` },
};

export default function SchedulePage() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Home</Link> / Schedule Meeting
        </div>
        <p className="kicker">📅 Free 20-minute consultation</p>
        <h1 className="h2">Schedule a Meeting With Nairobi&apos;s Web Team</h1>
        <div className="gold-rule" />
        <p className="lead">
          Pick a time that suits you — <strong>video call, phone call, office visit or WhatsApp chat</strong>. We
          come prepared: you leave with honest advice and a fixed KSh quotation.
        </p>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>📞 What happens next?</h3>
            <div className="info-row">
              <p>1 · REQUEST (2 MINUTES)</p>
              <p style={{ color: "#fff", fontWeight: 700 }}>Send the form with your preferred slot.</p>
            </div>
            <div className="info-row">
              <p>2 · CONFIRMATION (SAME DAY)</p>
              <p style={{ color: "#fff", fontWeight: 700 }}>We confirm on email + WhatsApp with a Meet link or directions.</p>
            </div>
            <div className="info-row">
              <p>3 · MEETING (20 MINUTES)</p>
              <p style={{ color: "#fff", fontWeight: 700 }}>Goals, pages, price and timeline. No pressure, no jargon.</p>
            </div>
            <div className="info-row">
              <p>PREFER INSTANT?</p>
              <Link className="big" href={WHATSAPP_LINK} target="_blank">
                WhatsApp us now →
              </Link>
              <p style={{ marginTop: 8 }}>
                <Link href={PHONE_HREF} style={{ color: "#fff", fontWeight: 800 }}>
                  {PHONE_DISPLAY}
                </Link>{" "}
                · {EMAIL}
              </p>
            </div>
          </div>
          <div className="form-card">
            <h3>Pick your slot →</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "6px 0 16px" }}>
              Mon–Sat, 8am–8pm EAT. We confirm within a few working hours.
            </p>
            <ScheduleForm />
          </div>
        </div>
      </div>
    </section>
  );
}
