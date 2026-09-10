import type { Metadata } from "next";
import Link from "next/link";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin Dashboard – SuperWeb Lead Management",
  description: "Private SuperWeb CRM dashboard.",
  alternates: { canonical: `${SITE_URL}/admin` },
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="section" style={{ paddingTop: 32 }}>
      <div className="wrap">
        <div className="crumbs"><Link href="/">Home</Link> / Admin</div>
        <h1 className="h2">Lead Management Dashboard</h1>
        <p className="lead">
          Track every website quote request, update deal stages and export to Excel. Set <code>ADMIN_TOKEN</code> in{" "}
          <code>.env</code> to lock this page in production.
        </p>
        <AdminDashboard />
      </div>
    </section>
  );
}
