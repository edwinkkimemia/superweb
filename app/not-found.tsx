import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ textAlign: "center" }}>
        <p className="kicker">404 — Page not found</p>
        <h1 className="h2">Oops. That page went offline.</h1>
        <p className="lead" style={{ margin: "12px auto" }}>Try our homepage, pricing or contact page instead.</p>
        <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-navy">← Homepage</Link>
          <Link href="/pricing" className="btn btn-outline">Website Prices</Link>
          <Link href="/quote" className="btn btn-primary">Get a Quote →</Link>
        </div>
      </div>
    </section>
  );
}
