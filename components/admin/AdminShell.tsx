"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminEmail } from "@/lib/admin";

const LINKS = [
  { href: "/admin/overview", label: "📊 Overview" },
  { href: "/admin/leads", label: "📥 Leads" },
  { href: "/admin/settings", label: "⚙️ Settings" },
];

export default function AdminShell({
  children,
  db,
}: {
  children: React.ReactNode;
  db?: boolean | null;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function lock() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      /* cookie clears on next login anyway */
    }
    clearAdminEmail();
    router.push("/admin/login");
    router.refresh();
  }

  function exportCsv() {
    window.open("/api/leads.csv", "_blank");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <h4>SuperWeb CRM</h4>
        <nav className="admin-nav">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href || pathname.startsWith(l.href + "/") ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={exportCsv}>⬇️ Export CSV</button>
        <Link href="/" className="admin-ghost">
          🌐 View Website
        </Link>
        <button style={{ marginTop: 10 }} onClick={lock}>
          🔒 Logout
        </button>
        {db !== undefined && (
          <div style={{ marginTop: 16, fontSize: 12, color: "#C9D7FF" }}>
            {db === null ? "checking db…" : db ? "● PostgreSQL connected" : "○ Memory mode (set DATABASE_URL)"}
          </div>
        )}
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
