"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { AdminGateError, useAdminGuard } from "@/components/admin/AdminGuard";
import { countBuckets, LEAD_BUCKETS } from "@/lib/leadBuckets";
import type { LeadStats } from "@/lib/types";

function pill(s: string) {
  const cls =
    s === "new"
      ? "st-new"
      : s === "contacted"
        ? "st-contacted"
        : s === "quoted"
          ? "st-quoted"
          : s === "won"
            ? "st-won"
            : "st-lost";
  return <span className={`status ${cls}`}>{s}</span>;
}

export default function AdminOverview() {
  const { checking, error: guardError } = useAdminGuard();
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (checking) return;
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checking]);

  async function load() {
    try {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Could not load stats.");
      const json = (await res.json()) as { stats: LeadStats };
      setStats(json.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    }
  }

  if (checking) return <p className="lead">Checking access…</p>;
  if (guardError) return <AdminGateError message={guardError} />;

  const winRate =
    stats && stats.total > 0 ? `${Math.round(((stats.byStatus["won"] ?? 0) / stats.total) * 100)}%` : "—";

  return (
    <AdminShell>
      {error && <p className="form-msg err">{error}</p>}
      <div className="stat-cards">
        <div className="stat">
          <span>Total leads</span>
          <strong>{stats?.total ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>Today</span>
          <strong>{stats?.today ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>Last 7 days</span>
          <strong>{stats?.last7Days ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>Win rate</span>
          <strong>{winRate}</strong>
        </div>
      </div>
      <div className="grid-2">
        <div className="card">
          <h3>By service needed</h3>
          <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
            {stats &&
              Object.entries(stats.byProjectType)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid var(--line)",
                      padding: "6px 0",
                    }}
                  >
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
            {!stats && <p style={{ color: "var(--muted)" }}>Loading…</p>}
          </div>
        </div>
        <div className="card">
          <h3>By stage</h3>
          <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
            {stats &&
              Object.entries(stats.byStatus)
                .sort((a, b) => b[1] - a[1])
                .map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid var(--line)",
                      padding: "6px 0",
                    }}
                  >
                    <span>{pill(k)}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
            {!stats && <p style={{ color: "var(--muted)" }}>Loading…</p>}
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Enquiries by type</h3>
        <p>Each inbox on its own page — work quotes before they cool.</p>
        <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
          {LEAD_BUCKETS.map((b) => (
            <a
              key={b.id}
              href={b.href}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid var(--line)",
                padding: "8px 0",
                fontWeight: 700,
              }}
            >
              <span>
                {b.icon} {b.label}
              </span>
              <span>
                <strong style={{ marginRight: 8 }}>
                  {stats ? countBuckets(stats.bySource)[b.id] : "—"}
                </strong>
                <span style={{ color: "var(--blue)" }}>Open →</span>
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Quick actions</h3>
        <p>Jump to leads to update deal stages, or export everything to CSV for Excel.</p>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <a className="btn btn-navy btn-sm" href="/admin/leads">
            📥 Manage Leads →
          </a>
          <a className="btn btn-outline btn-sm" href="/admin/analytics">
            📈 View Analytics
          </a>
          <a className="btn btn-outline btn-sm" href="/admin/settings">
            ⚙️ Open Settings
          </a>
        </div>
      </div>
    </AdminShell>
  );
}
