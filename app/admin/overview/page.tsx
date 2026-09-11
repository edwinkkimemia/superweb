import type { Metadata } from "next";
import AdminOverview from "@/components/admin/AdminOverview";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Overview – SuperWeb Admin",
  description: "Lead stats overview.",
  alternates: { canonical: `${SITE_URL}/admin/overview` },
  robots: { index: false, follow: false },
};

export default function AdminOverviewPage() {
  return <AdminOverview />;
}
