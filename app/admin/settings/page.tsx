import type { Metadata } from "next";
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
      <h1 className="h2">Settings</h1>
      <p className="lead">Business profile, lead preferences and security. Saved in this browser.</p>
      <AdminSettings />
    </>
  );
}
