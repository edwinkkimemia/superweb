"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { AdminGateError, useAdminGuard } from "@/components/admin/AdminGuard";
import {
  clearAdminEmail,
  DEFAULT_SETTINGS,
  getAdminEmail,
  getAdminSettings,
  saveAdminSettings,
  type AdminSettings as Settings,
} from "@/lib/admin";

export default function AdminSettings() {
  const { checking, db, error: guardError } = useAdminGuard();
  const router = useRouter();
  const [form, setForm] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState("");
  const [adminEmail, setAdminEmailState] = useState("");
  const [pwEmail, setPwEmail] = useState("");
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwOk, setPwOk] = useState(false);
  const [pwBusy, setPwBusy] = useState(false);

  useEffect(() => {
    setForm(getAdminSettings());
    const em = getAdminEmail();
    setAdminEmailState(em);
    setPwEmail(em);
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

  async function onChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirmPw) {
      setPwOk(false);
      setPwMsg("New passwords don't match.");
      return;
    }
    setPwBusy(true);
    setPwMsg("Saving…");
    setPwOk(false);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pwEmail.trim(), currentPassword: curPw, newPassword: newPw }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Could not change password.");
      setPwOk(true);
      setPwMsg("✅ Password updated. Use it next time you sign in.");
      setCurPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (err) {
      setPwOk(false);
      setPwMsg(err instanceof Error ? err.message : "Could not change password.");
    } finally {
      setPwBusy(false);
    }
  }

  if (checking) return <p className="lead">Checking access…</p>;
  if (guardError) return <AdminGateError message={guardError} />;

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
          <h3>🔑 Change password</h3>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Stored hashed in Postgres and takes effect on your next sign-in.
          </p>
          {db === false && (
            <p className="form-msg err" style={{ marginTop: 8 }}>
              No database connected — set DATABASE_URL to enable password changes.
            </p>
          )}
          <form onSubmit={(e) => void onChangePassword(e)} style={{ marginTop: 12 }}>
            <div className="form-grid">
              <div className="field full">
                <label>Account email</label>
                <input type="email" value={pwEmail} onChange={(e) => setPwEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>Current password</label>
                <input
                  type="password"
                  value={curPw}
                  onChange={(e) => setCurPw(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="field">
                <label>New password (min 8)</label>
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="field full">
                <label>Confirm new password</label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>
            {pwMsg && <p className={`form-msg${pwOk ? " ok" : " err"}`} style={{ marginTop: 10 }}>{pwMsg}</p>}
            <button type="submit" className="btn btn-navy btn-sm" style={{ marginTop: 10 }} disabled={pwBusy}>
              {pwBusy ? "Saving…" : "🔑 Update Password"}
            </button>
          </form>
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
