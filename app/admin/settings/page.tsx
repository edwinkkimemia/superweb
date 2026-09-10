import type { Metadata } from "next";
import Link from "next/link";
import AdminSettings from "@/components/admin/AdminSettings";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Settings – SuperWeb Admin",
  description: "Admin preferences and security.",
  alternates: { canonical: `${SITE_URL}/admin/settings` },
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <>
      <div className="crumbs">
        <Link href="/">Home</Link> / Admin / Settings
      </div>
      <h1 className="h2">Settings</h1>
      <p className="lead">Business profile, lead preferences and security. Saved in this browser.</p>
      <AdminSettings />
    </>
  );
}
