import Link from "next/link";
import { EMAIL, LOGO_SRC, PHONE_DISPLAY, PHONE_HREF, SOCIALS } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO_SRC} alt="SuperWeb" className="footer-logo" />
            </div>
            <p style={{ marginTop: 12, fontSize: 14 }}>
              Nairobi&apos;s results-driven <strong>website design company in Kenya</strong>. Websites,
              ecommerce, AI, SEO, mobile apps, cybersecurity, IT support &amp; branding. Call{" "}
              <Link href={PHONE_HREF} style={{ display: "inline", color: "#fff", fontWeight: 800 }}>
                {PHONE_DISPLAY}
              </Link>
              .
            </p>
            <p style={{ marginTop: 10 }}>
              ✉️ {EMAIL}
              <br />📍 Nairobi, Kenya — serving all counties
            </p>
            <div className="social-row">
              {SOCIALS.map((s) => (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={`SuperWeb on ${s.label}`} title={s.label} className="social-btn">
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <Link href="/services">Website Design Kenya</Link>
            <Link href="/services">Ecommerce Development</Link>
            <Link href="/services/ai-solutions">🤖 AI Solutions</Link>
            <Link href="/services/seo">SEO Services Kenya</Link>
            <Link href="/services/web-applications">Web Applications</Link>
            <Link href="/services/mobile-apps">📱 Mobile Apps</Link>
            <Link href="/services/cybersecurity">🔒 Cybersecurity</Link>
            <Link href="/services/it-support">🖥️ IT Support</Link>
            <Link href="/services/graphic-design">🎨 Graphic & Visual Design</Link>
            <Link href="/pricing">Website Prices Kenya</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/work">Our Work</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h4>Schedule a Meeting</h4>
            <Link href="/schedule">📅 Book Free Consultation</Link>
            <Link href={PHONE_HREF}>Call: {PHONE_DISPLAY}</Link>
            <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
            <Link href="/contact">Request Online →</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SuperWeb · superweb.co.ke · Website Design Nairobi, Kenya</span>
          <span>
            <strong style={{ color: "#7DD3FC" }}>Built in Kenya.</strong> Serving globally.
          </span>
        </div>
      </div>
    </footer>
  );
}
