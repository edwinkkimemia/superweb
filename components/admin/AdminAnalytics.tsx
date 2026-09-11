"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { AdminGateError, useAdminGuard } from "@/components/admin/AdminGuard";
import type { AnalyticsSummary } from "@/lib/db";

export default function AdminAnalytics() {
  const { checking, error: guardError } = useAdminGuard();
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (checking) return;
    (async () => {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) throw new Error("Could not load analytics.");
        const json = (await res.json()) as { summary: AnalyticsSummary };
        setData(json.summary);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load.");
      }
    })();
  }, [checking]);

  if (checking) return <p className="lead">Checking access…</p>;
  if (guardError) return <AdminGateError message={guardError} />;

  const maxDay = Math.max(1, ...(data?.daily.map((d) => d.views) ?? [1]));

  return (
    <AdminShell>
      {error && <p className="form-msg err">{error}</p>}
      <div className="stat-cards">
        <div className="stat">
          <span>Visitors today</span>
          <strong>{data?.uniqueToday ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>Views today</span>
          <strong>{data?.todayViews ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>Views · 7 days</span>
          <strong>{data?.last7Views ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>Total views</span>
          <strong>{data?.totalViews ?? "—"}</strong>
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h3>Daily views · last 14 days</h3>
        {!data || data.daily.length === 0 ? (
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            No visits recorded yet. Browse the site and they will appear here within seconds.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              height: 160,
              marginTop: 16,
              paddingTop: 8,
            }}
            role="img"
            aria-label="Daily page views chart"
          >
            {data.daily.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.views} views · ${d.uniques} visitors`}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: `${Math.max(4, Math.round((d.views / maxDay) * 150))}px`,
                  borderRadius: "6px 6px 0 0",
                  background: "linear-gradient(180deg, var(--blue), var(--navy-2))",
                }}
              />
            ))}
          </div>
        )}
        {data && data.daily.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            {data.daily.map((d) => (
              <span
                key={d.date}
                style={{ flex: 1, minWidth: 0, fontSize: 10, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {d.date.slice(5)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Top pages</h3>
          <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
            {data?.topPages.length ? (
              data.topPages.map((p) => (
                <div
                  key={p.path}
                  style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", padding: "6px 0" }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "75%" }}>
                    {p.path}
                  </span>
                  <strong>{p.views}</strong>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--muted)" }}>No data yet.</p>
            )}
          </div>
        </div>
        <div className="card">
          <h3>Top referrers</h3>
          <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
            {data?.topReferrers.length ? (
              data.topReferrers.map((r) => (
                <div
                  key={r.ref}
                  style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", padding: "6px 0" }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "75%" }}>
                    {r.ref}
                  </span>
                  <strong>{r.views}</strong>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--muted)" }}>Direct traffic so far — share your links to see sources here.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>By country</h3>
          <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
            {data?.byCountry.length ? (
              data.byCountry.map((c) => (
                <div
                  key={c.country}
                  style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", padding: "6px 0" }}
                >
                  <span>{c.country}</span>
                  <strong>{c.views}</strong>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--muted)" }}>No data yet.</p>
            )}
          </div>
        </div>
        <div className="card">
          <h3>By device</h3>
          <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
            {data?.byDevice.length ? (
              data.byDevice.map((d) => (
                <div
                  key={d.device}
                  style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", padding: "6px 0" }}
                >
                  <span style={{ textTransform: "capitalize" }}>{d.device}</span>
                  <strong>{d.views}</strong>
                </div>
              ))
            ) : (
              <p style={{ color: "var(--muted)" }}>No data yet.</p>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
