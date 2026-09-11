"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EMAIL, LOGO_SRC, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { SERVICES } from "@/data/services";

/** Services pinned as individual navbar links (chosen by site owner). */
const PINNED_SLUGS = [
  "business-websites",
  "ecommerce",
  "ai-solutions",
  "seo",
  "mobile-apps",
  "graphic-design",
];

/** Short labels so six service links fit the navbar. */
const SHORT_LABELS: Record<string, string> = {
  "business-websites": "Websites",
  ecommerce: "Ecommerce",
  "ai-solutions": "AI Solutions",
  seo: "SEO",
  "mobile-apps": "Mobile Apps",
  "graphic-design": "Graphics & Design",
};

const PINNED = PINNED_SLUGS.map(
  (slug) => SERVICES.find((s) => s.slug === slug)!
).filter(Boolean);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div>
            📍 Nairobi, Kenya · ✉️ <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div className="tb-right">
            <span>Mon–Sat 8am–8pm EAT</span>
            <a href={PHONE_HREF}>📞 {PHONE_DISPLAY}</a>
            <Link href="/contact" className="tb-quote">
              Get a Quote →
            </Link>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="SuperWeb home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_SRC} alt="SuperWeb — Website Design Kenya" className="brand-logo" />
          </Link>
          <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            ☰ Menu
          </button>
          <nav className={`main-nav${open ? " open" : ""}`} id="mainNav">
            {PINNED.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className={pathname === s.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {SHORT_LABELS[s.slug] ?? s.label}
              </Link>
            ))}
            <Link
              href="/work"
              className={pathname.startsWith("/work") ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              Our Work
            </Link>
            <Link href="/schedule" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
              📅 Schedule Meeting →
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
