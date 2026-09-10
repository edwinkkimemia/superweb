import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/forms/LeadForm";
import Faq from "@/components/ui/Faq";
import CtaBand from "@/components/ui/CtaBand";
import { getService, SERVICE_DETAILS } from "@/data/serviceDetails";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: `${SITE_URL}/services/${s.slug}` },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${s.label} — SuperWeb Kenya`,
    provider: { "@type": "ProfessionalService", name: "SuperWeb", telephone: "+254715135141" },
    areaServed: "Kenya",
    offers: { "@type": "Offer", priceCurrency: "KES", price: s.price },
  };

  const related = SERVICE_DETAILS.filter((r) => r.slug !== s.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / {s.label}
          </div>
          <p className="kicker">{s.kicker}</p>
          <h1 className="h2">{s.h1}</h1>
          <div className="gold-rule" />
          <p className="lead">{s.lead}</p>

          <div className="img-band">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={s.imageAlt} />
            <div className="form-card">
              <h3>
                {s.icon} {s.price}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 14, margin: "6px 0 4px" }}>
                ⏱ {s.timeline} · {s.priceNote}
              </p>
              <div style={{ marginTop: 12 }}>
                <LeadForm source={`/services/${s.slug}`} compact />
              </div>
            </div>
          </div>

          <h2 className="h2" style={{ marginTop: 40 }}>What&apos;s included</h2>
          <div className="gold-rule" />
          <div className="grid-3">
            {s.features.map((f) => (
              <div className="card" key={f.t}>
                <div className="icon">{f.icon}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>

          <h2 className="h2" style={{ marginTop: 36 }}>{s.label} FAQs</h2>
          <Faq items={s.faqs} />

          <h2 className="h2" style={{ marginTop: 36 }}>Keep exploring</h2>
          <div className="grid-3">
            {related.map((r) => (
              <div className="card" key={r.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="svc-img" src={r.image} alt={r.imageAlt} loading="lazy" />
                <h3>
                  {r.icon} {r.label}
                </h3>
                <p>
                  <strong>{r.price}</strong> · {r.timeline}
                </p>
                <Link className="price-link" href={`/services/${r.slug}`}>
                  View {r.label} →
                </Link>
              </div>
            ))}
          </div>

          <CtaBand
            title={`Ready for ${s.label.toLowerCase()} that pays for itself?`}
            text="Fixed written quotation in 24 hours — or schedule a free 20-minute meeting first."
            btnLabel="Schedule Free Meeting →"
            btnHref="/schedule"
          />
        </div>
      </section>
    </>
  );
}
