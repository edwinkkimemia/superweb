import type { Metadata } from "next";
import AdminLeads from "@/components/admin/AdminLeads";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedules – SuperWeb Admin",
  description: "Meeting bookings from the schedule page.",
  alternates: { canonical: `${SITE_URL}/admin/schedules` },
  robots: { index: false, follow: false },
};

export default function AdminSchedulesPage() {
  return (
    <>
      <h1 className="h2">📅 Schedules</h1>
      <p className="lead">Meeting bookings from the schedule page. Confirm fast — hot leads cool quickly.</p>
      <AdminLeads bucket="schedules" />
    </>
  );
}
