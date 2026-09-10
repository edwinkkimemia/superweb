import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin Login – SuperWeb CRM",
  description: "Private SuperWeb admin login.",
  alternates: { canonical: `${SITE_URL}/admin/login` },
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <>
      <div className="crumbs">
        <Link href="/">Home</Link> / <Link href="/admin">Admin</Link> / Login
      </div>
      <h1 className="h2">Admin Login</h1>
      <p className="lead">Sign in with your admin token to access leads, stats and settings.</p>
      <AdminLoginForm />
    </>
  );
}
