import type { Metadata } from "next";
import AdminLeads from "@/components/admin/AdminLeads";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Audit Offers – SuperWeb Admin",
  description: "Free-audit claims from the offer page.",
  alternates: { canonical: `${SITE_URL}/admin/offers` },
  robots: { index: false, follow: false },
};

export default function AdminOffersPage() {
  return (
    <>
      <h1 className="h2">🎁 Audit Offers</h1>
      <p className="lead">Free-audit claims from the offer page. Deliver within 48 hours as promised.</p>
      <AdminLeads bucket="offers" />
    </>
  );
}
