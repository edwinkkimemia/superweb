"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EMAIL, LOGO_SRC, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { SERVICES } from "@/data/services";

const DIRECT_SERVICES = [
  { href: "/services/business-websites", label: "Websites" },
  { href: "/services/ecommerce", label: "Ecommerce" },
  { href: "/services/ai-solutions", label: "AI Solutions" },
  { href: "/services/seo", label: "SEO" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const servicesActive = pathname.startsWith("/services");

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div>
            📍 Nairobi, Kenya · Serving all Kenya &amp; Africa · ✉️ <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div className="tb-right">
            <span>Mon–Sat 8am–8pm EAT</span>
            <a href={PHONE_HREF}>📞 {PHONE_DISPLAY}</a>
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
            {DIRECT_SERVICES.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={pathname === l.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div
              className={`nav-item${servicesActive ? " active-parent" : ""}`}
              onMouseEnter={() => setSvcOpen(true)}
              onMouseLeave={() => setSvcOpen(false)}
            >
              <Link
                href="/services"
                className={servicesActive ? "active" : ""}
                onClick={() => setOpen(false)}
                aria-haspopup="true"
                aria-expanded={svcOpen}
              >
                All Services ▾
              </Link>
              <div className={`nav-drop${svcOpen || open ? " show" : ""}`}>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={s.href} onClick={() => setOpen(false)}>
                    <span className="nd-icon">{s.icon}</span>
                    <span>
                      <strong>{s.label}</strong>
                      <small>{s.short}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
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
