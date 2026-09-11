import type { Metadata } from "next";
import AdminLeads from "@/components/admin/AdminLeads";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quotes – SuperWeb Admin",
  description: "Quote requests from the quote page, homepage and service pages.",
  alternates: { canonical: `${SITE_URL}/admin/quotes` },
  robots: { index: false, follow: false },
};

export default function AdminQuotesPage() {
  return (
    <>
      <h1 className="h2">💰 Quotes</h1>
      <p className="lead">Quote requests from the quote page, homepage hero and service pages.</p>
      <AdminLeads bucket="quotes" />
    </>
  );
}
