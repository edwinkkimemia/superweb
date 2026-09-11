import type { Metadata } from "next";
import AdminLeads from "@/components/admin/AdminLeads";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leads – SuperWeb Admin",
  description: "Manage all leads.",
  alternates: { canonical: `${SITE_URL}/admin/leads` },
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return (
    <>
      <h1 className="h2">All Leads</h1>
      <p className="lead">Search, filter by stage and update deals. Changes save instantly.</p>
      <AdminLeads />
    </>
  );
}
