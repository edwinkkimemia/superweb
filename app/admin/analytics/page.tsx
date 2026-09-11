import type { Metadata } from "next";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Analytics – SuperWeb Admin",
  description: "Website traffic: visitors, views, top pages and referrers.",
  alternates: { canonical: `${SITE_URL}/admin/analytics` },
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsPage() {
  return (
    <>
      <h1 className="h2">📈 Analytics</h1>
      <p className="lead">Real visits to your website — first-party tracking, no cookies banner needed.</p>
      <AdminAnalytics />
    </>
  );
}
