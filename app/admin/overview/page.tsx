import type { Metadata } from "next";
import Link from "next/link";
import AdminOverview from "@/components/admin/AdminOverview";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Overview – SuperWeb Admin",
  description: "Lead stats overview.",
  alternates: { canonical: `${SITE_URL}/admin/overview` },
  robots: { index: false, follow: false },
};

export default function AdminOverviewPage() {
  return (
    <>
      <div className="crumbs">
        <Link href="/">Home</Link> / Admin / Overview
      </div>
      <h1 className="h2">Dashboard Overview</h1>
      <p className="lead">Track every quote request, win rate and pipeline at a glance.</p>
      <AdminOverview />
    </>
  );
}
