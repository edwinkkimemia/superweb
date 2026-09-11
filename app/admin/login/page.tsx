import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { SITE_URL } from "@/lib/site";
import { ADMIN_COOKIE } from "@/lib/adminCookie";
import { isValidAdminSession } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin Login – SuperWeb CRM",
  description: "Private SuperWeb admin login.",
  alternates: { canonical: `${SITE_URL}/admin/login` },
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const cookie = cookies().get(ADMIN_COOKIE)?.value ?? "";
  if (await isValidAdminSession(cookie)) redirect("/admin/overview");

  return (
    <>
      <h1 className="h2">Admin Login</h1>
      <p className="lead">Sign in with your admin email and password.</p>
      <AdminLoginForm />
    </>
  );
}
