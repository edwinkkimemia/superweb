"use client";

import { useCallback, useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { AdminGateError, useAdminGuard } from "@/components/admin/AdminGuard";
import { getAdminSettings } from "@/lib/admin";
import type { Lead } from "@/lib/types";

const STAGES = ["new", "contacted", "quoted", "won", "lost"];

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

export default function AdminLeads() {
  const { checking, db, error: guardError } = useAdminGuard();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [error, setError] = useState("");

  const loadLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error("Failed to load leads.");
      const json = (await res.json()) as { leads: Lead[] };
      setLeads(json.leads ?? []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    }
  }, []);

  useEffect(() => {
    if (checking) return;
    void loadLeads();
  }, [checking, loadLeads]);

  async function setStage(id: number, status: string) {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch {
      alert("Could not update stage. Please sign in again.");
    }
  }

  if (checking) return <p className="lead">Checking access…</p>;
  if (guardError) return <AdminGateError message={guardError} />;

  const limit = getAdminSettings().leadsPerPage || 50;
  const filtered = leads
    .filter((l) => {
      if (stageFilter && l.status !== stageFilter) return false;
      if (!query) return true;
      return `${l.name} ${l.email} ${l.company ?? ""} ${l.phone ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase());
    })
    .slice(0, limit);

  return (
    <AdminShell db={db}>
      {error && <p className="form-msg err">{error}</p>}
      <div className="card" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, company…"
          style={{
            flex: 1,
            minWidth: 200,
            border: "1.5px solid var(--line-2)",
            borderRadius: 10,
            padding: "11px 12px",
            fontSize: 14,
          }}
        />
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          style={{ border: "1.5px solid var(--line-2)", borderRadius: 10, padding: 11, fontSize: 14 }}
        >
          <option value="">All stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="btn btn-navy btn-sm" onClick={() => void loadLeads()}>
          ↻ Refresh
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Contact</th>
              <th>Service / Budget</th>
              <th>Message</th>
              <th>Stage</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>No leads match. Try clearing search.</td>
              </tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id}>
                <td>
                  <strong>#{l.id}</strong>
                  <br />
                  <span style={{ color: "var(--muted)", fontSize: 12 }}>{l.sourcePage ?? "/"}</span>
                </td>
                <td>
                  <strong>{l.name}</strong>
                  <br />
                  {l.email}
                  <br />
                  <span style={{ color: "var(--muted)" }}>
                    {l.company ?? ""} {l.phone ?? ""}
                  </span>
                </td>
                <td>
                  {l.projectType}
                  <br />
                  <span style={{ color: "var(--muted)" }}>{l.budget}</span>
                </td>
                <td style={{ maxWidth: 240 }}>{(l.message ?? "—").slice(0, 140)}</td>
                <td>
                  <select
                    value={l.status}
                    onChange={(e) => void setStage(l.id, e.target.value)}
                    style={{ border: "1.5px solid var(--line-2)", borderRadius: 8, padding: 7, fontSize: 13 }}
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <div style={{ marginTop: 6 }}>{pill(l.status)}</div>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{new Date(l.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
        Showing {filtered.length} of {leads.length} leads (page size set in Settings).
      </p>
    </AdminShell>
  );
}
