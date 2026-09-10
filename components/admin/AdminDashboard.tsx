"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lead } from "@/lib/types";

interface Stats {
  total: number;
  today: number;
  last7Days: number;
  byStatus: Record<string, number>;
  byProjectType: Record<string, number>;
  bySource: Record<string, number>;
}

const STAGES = ["new", "contacted", "quoted", "won", "lost"];

function pill(s: string) {
  const cls =
    s === "new" ? "st-new" : s === "contacted" ? "st-contacted" : s === "quoted" ? "st-quoted" : s === "won" ? "st-won" : "st-lost";
  return <span className={`status ${cls}`}>{s}</span>;
}

export default function AdminDashboard() {
  const [token, setToken] = useState<string>("");
  const [unlocked, setUnlocked] = useState(false);
  const [loginMsg, setLoginMsg] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [db, setDb] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [view, setView] = useState<"overview" | "leads">("overview");
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("sw_admin_token") ?? "";
    if (saved) {
      setToken(saved);
      void enter(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function enter(t: string) {
    setLoginMsg("Unlocking…");
    try {
      const headers: Record<string, string> = t ? { "x-admin-token": t } : {};
      const res = await fetch(`/api/stats${t ? `?token=${encodeURIComponent(t)}` : ""}`, { headers });
      if (res.status === 401) throw new Error("Invalid token. Ask your developer for ADMIN_TOKEN.");
      if (!res.ok) throw new Error("Could not reach the API.");
      const json = (await res.json()) as { stats: Stats; db: boolean };
      setStats(json.stats);
      setDb(json.db);
      localStorage.setItem("sw_admin_token", t);
      setUnlocked(true);
      setLoginMsg("");
      await loadLeads(t);
    } catch (err) {
      localStorage.removeItem("sw_admin_token");
      setLoginMsg(err instanceof Error ? err.message : "Login failed.");
    }
  }

  const loadLeads = useCallback(
    async (t = token) => {
      try {
        const headers: Record<string, string> = t ? { "x-admin-token": t } : {};
        const res = await fetch(`/api/leads${t ? `?token=${encodeURIComponent(t)}` : ""}`, { headers });
        if (!res.ok) throw new Error("Failed to load leads.");
        const json = (await res.json()) as { leads: Lead[] };
        setLeads(json.leads ?? []);
      } catch {
        /* keep previous list */
      }
    },
    [token]
  );

  async function setStage(id: number, status: string) {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...(token ? { "x-admin-token": token } : {}) },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      const s = await (await fetch(`/api/stats${token ? `?token=${encodeURIComponent(token)}` : ""}`, { headers: token ? { "x-admin-token": token } : {} })).json() as { stats: Stats };
      setStats(s.stats);
    } catch {
      alert("Could not update stage. Check admin token.");
    }
  }

  if (!unlocked) {
    return (
      <div className="login-card">
        <h3>🔐 Admin access</h3>
        <p style={{ color: "var(--muted)", fontSize: 14, margin: "6px 0 14px" }}>
          Enter your admin token. It is stored only in this browser.
        </p>
        <div className="field">
          <label>Admin token</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="superweb-admin-..."
          />
        </div>
        <p className="form-msg err">{loginMsg}</p>
        <button className="btn btn-navy" style={{ width: "100%", justifyContent: "center", marginTop: 10 }} onClick={() => void enter(token.trim())}>
          Unlock Dashboard →
        </button>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
          Dev mode: if no ADMIN_TOKEN is set on the server, leave this empty and click Unlock.
        </p>
      </div>
    );
  }

  const filtered = leads.filter((l) => {
    if (stageFilter && l.status !== stageFilter) return false;
    if (!query) return true;
    return `${l.name} ${l.email} ${l.company ?? ""} ${l.phone ?? ""}`.toLowerCase().includes(query.toLowerCase());
  });
  const winRate = stats && stats.total > 0 ? `${Math.round(((stats.byStatus["won"] ?? 0) / stats.total) * 100)}%` : "—";

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <h4>SuperWeb CRM</h4>
        <button className={view === "overview" ? "active" : ""} onClick={() => setView("overview")}>📊 Overview</button>
        <button className={view === "leads" ? "active" : ""} onClick={() => setView("leads")}>📥 All Leads</button>
        <button onClick={() => window.open(`/api/leads.csv${token ? `?token=${encodeURIComponent(token)}` : ""}`, "_blank")}>⬇️ Export CSV</button>
        <button
          style={{ marginTop: 18 }}
          onClick={() => {
            localStorage.removeItem("sw_admin_token");
            window.location.reload();
          }}
        >
          🔒 Lock
        </button>
        <div style={{ marginTop: 16, fontSize: 12, color: "#C9D7FF" }}>
          {db === null ? "checking db…" : db ? "● PostgreSQL connected" : "○ Memory mode (set DATABASE_URL)"}
        </div>
      </aside>
      <div>
        {view === "overview" && (
          <div id="view-overview">
            <div className="stat-cards">
              <div className="stat"><span>Total leads</span><strong>{stats?.total ?? "—"}</strong></div>
              <div className="stat"><span>Today</span><strong>{stats?.today ?? "—"}</strong></div>
              <div className="stat"><span>Last 7 days</span><strong>{stats?.last7Days ?? "—"}</strong></div>
              <div className="stat"><span>Win rate</span><strong>{winRate}</strong></div>
            </div>
            <div className="grid-2">
              <div className="card">
                <h3>By service needed</h3>
                <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
                  {stats && Object.entries(stats.byProjectType).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", padding: "6px 0" }}>
                      <span>{k}</span><strong>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3>By stage</h3>
                <div style={{ marginTop: 10, display: "grid", gap: 8, fontSize: 14 }}>
                  {stats && Object.entries(stats.byStatus).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)", padding: "6px 0" }}>
                      <span>{pill(k)}</span><strong>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {view === "leads" && (
          <div>
            <div className="card" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, company…"
                style={{ flex: 1, minWidth: 200, border: "1.5px solid var(--line-2)", borderRadius: 10, padding: "11px 12px", fontSize: 14 }}
              />
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                style={{ border: "1.5px solid var(--line-2)", borderRadius: 10, padding: 11, fontSize: 14 }}
              >
                <option value="">All stages</option>
                {STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button className="btn btn-navy btn-sm" onClick={() => { void loadLeads(); }}>↻ Refresh</button>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>ID</th><th>Contact</th><th>Service / Budget</th><th>Message</th><th>Stage</th><th>Date</th></tr></thead>
                <tbody>
                  {filtered.length === 0 && (<tr><td colSpan={6}>No leads match. Try clearing search.</td></tr>)}
                  {filtered.map((l) => (
                    <tr key={l.id}>
                      <td><strong>#{l.id}</strong><br /><span style={{ color: "var(--muted)", fontSize: 12 }}>{l.sourcePage ?? "/"}</span></td>
                      <td><strong>{l.name}</strong><br />{l.email}<br /><span style={{ color: "var(--muted)" }}>{l.company ?? ""} {l.phone ?? ""}</span></td>
                      <td>{l.projectType}<br /><span style={{ color: "var(--muted)" }}>{l.budget}</span></td>
                      <td style={{ maxWidth: 240 }}>{(l.message ?? "—").slice(0, 140)}</td>
                      <td>
                        <select value={l.status} onChange={(e) => void setStage(l.id, e.target.value)} style={{ border: "1.5px solid var(--line-2)", borderRadius: 8, padding: 7, fontSize: 13 }}>
                          {STAGES.map((s) => (<option key={s} value={s}>{s}</option>))}
                        </select>
                        <div style={{ marginTop: 6 }}>{pill(l.status)}</div>
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>{new Date(l.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
