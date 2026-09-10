import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin – SuperWeb CRM",
  description: "Private SuperWeb CRM dashboard.",
  alternates: { canonical: `${SITE_URL}/admin` },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section" style={{ paddingTop: 32 }}>
      <div className="wrap">{children}</div>
    </section>
  );
}
