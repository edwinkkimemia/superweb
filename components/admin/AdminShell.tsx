"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAdminEmail } from "@/lib/admin";
import { countBuckets, LEAD_BUCKETS, type LeadBucket } from "@/lib/leadBuckets";

const TOP_LINKS = [{ href: "/admin/overview", label: "📊 Overview" }];
const BOTTOM_LINKS = [
  { href: "/admin/leads", label: "📥 All Leads" },
  { href: "/admin/settings", label: "⚙️ Settings" },
];

function navActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/") ? "active" : "";
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [counts, setCounts] = useState<Record<LeadBucket, number> | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) return;
        const json = (await res.json()) as { stats?: { bySource?: Record<string, number> } };
        if (!cancelled && json.stats?.bySource) setCounts(countBuckets(json.stats.bySource));
      } catch {
        /* counts stay hidden */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

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

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <h4>SuperWeb CRM</h4>
        <nav className="admin-nav">
          {TOP_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={navActive(pathname, l.href)}>
              {l.label}
            </Link>
          ))}
          {LEAD_BUCKETS.map((b) => (
            <Link key={b.href} href={b.href} className={navActive(pathname, b.href)}>
              <span>
                {b.icon} {b.label}
              </span>
              {counts !== null && <span className="admin-count">{counts[b.id]}</span>}
            </Link>
          ))}
          {BOTTOM_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={navActive(pathname, l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={lock}>
          🔒 Logout
        </button>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
