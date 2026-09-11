import type { Metadata } from "next";
import AdminLeads from "@/components/admin/AdminLeads";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Messages – SuperWeb Admin",
  description: "General contact messages from the contact page.",
  alternates: { canonical: `${SITE_URL}/admin/messages` },
  robots: { index: false, follow: false },
};

export default function AdminMessagesPage() {
  return (
    <>
      <h1 className="h2">✉️ Messages</h1>
      <p className="lead">General contact messages — questions, support and partnerships.</p>
      <AdminLeads bucket="messages" />
    </>
  );
}
