"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminGuard } from "@/components/admin/AdminGuard";
import {
  clearAdminEmail,
  DEFAULT_SETTINGS,
  getAdminEmail,
  getAdminSettings,
  saveAdminSettings,
  type AdminSettings as Settings,
} from "@/lib/admin";

export default function AdminSettings() {
  const { checking, db } = useAdminGuard();
  const router = useRouter();
  const [form, setForm] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState("");
  const [adminEmail, setAdminEmailState] = useState("");

  useEffect(() => {
    setForm(getAdminSettings());
    setAdminEmailState(getAdminEmail());
  }, [checking]);

  function update<K extends keyof Settings>(k: K, v: Settings[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    saveAdminSettings(form);
    setSaved("✅ Settings saved in this browser.");
    setTimeout(() => setSaved(""), 3000);
  }

  function onReset() {
    setForm(DEFAULT_SETTINGS);
    saveAdminSettings(DEFAULT_SETTINGS);
    setSaved("Reset to defaults.");
  }

  async function onLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      /* cookie clears on next login anyway */
    }
    clearAdminEmail();
    router.push("/admin/login");
    router.refresh();
  }

  if (checking) return <p className="lead">Checking access…</p>;

  return (
    <AdminShell db={db}>
      <form onSubmit={onSave}>
        <div className="grid-2" style={{ marginTop: 0 }}>
          <div className="card">
            <h3>🏢 Business profile</h3>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Used for exports and notifications.</p>
            <div className="field" style={{ marginTop: 12 }}>
              <label>Business name</label>
              <input value={form.businessName} onChange={(e) => update("businessName", e.target.value)} />
            </div>
            <div className="field" style={{ marginTop: 10 }}>
              <label>Notification email</label>
              <input
                type="email"
                value={form.notifyEmail}
                onChange={(e) => update("notifyEmail", e.target.value)}
              />
            </div>
            <div className="field" style={{ marginTop: 10 }}>
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>

          <div className="card">
            <h3>📥 Lead preferences</h3>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Control how leads are shown and handled.</p>
            <div className="field" style={{ marginTop: 12 }}>
              <label>Leads per page</label>
              <select
                value={form.leadsPerPage}
                onChange={(e) => update("leadsPerPage", Number(e.target.value))}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
            <label className="check-row">
              <input
                type="checkbox"
                checked={form.emailAlerts}
                onChange={(e) => update("emailAlerts", e.target.checked)}
              />
              Email me for every new lead
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={form.autoReply}
                onChange={(e) => update("autoReply", e.target.checked)}
              />
              Send instant WhatsApp-style auto reply
            </label>
          </div>
        </div>

        <div className="card" style={{ marginTop: 18 }}>
          <h3>🔐 Security</h3>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Signed in{adminEmail ? <> as <code>{adminEmail}</code></> : ""}.
            Pages are locked server-side — set <code>ADMIN_EMAIL</code> / <code>ADMIN_PASSWORD</code> in{" "}
            <code>.env</code> to enforce login in production.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <button type="submit" className="btn btn-navy btn-sm">
              💾 Save Settings
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={onReset}>
              ↺ Reset defaults
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => window.open("/api/leads.csv", "_blank")}
            >
              ⬇️ Export CSV
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={onLogout}>
              🔒 Logout everywhere (this browser)
            </button>
          </div>
          {saved && <p className="form-msg ok" style={{ marginTop: 10 }}>{saved}</p>}
        </div>
      </form>
    </AdminShell>
  );
}
