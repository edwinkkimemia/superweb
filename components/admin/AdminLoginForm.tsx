"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminToken, setAdminToken } from "@/lib/admin";

export default function AdminLoginForm() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = getAdminToken();
    if (saved) setToken(saved);
  }, []);

  async function unlock(e?: React.FormEvent) {
    e?.preventDefault();
    const t = token.trim();
    setBusy(true);
    setMsg("Unlocking…");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: t }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Login failed.");
      setAdminToken(t);
      setMsg("");
      router.push("/admin/overview");
      router.refresh();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-card">
      <h3>🔐 Admin access</h3>
      <p style={{ color: "var(--muted)", fontSize: 14, margin: "6px 0 14px" }}>
        Sign in with your admin token. A secure session keeps you logged in on this browser.
      </p>
      <form onSubmit={(e) => void unlock(e)}>
        <div className="field">
          <label>Admin token</label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="superweb-admin-..."
            autoComplete="current-password"
          />
        </div>
        {msg && <p className="form-msg err">{msg}</p>}
        <button
          className="btn btn-navy"
          style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
          type="submit"
          disabled={busy}
        >
          {busy ? "Unlocking…" : "Unlock Dashboard →"}
        </button>
      </form>
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
        Dev mode: if no ADMIN_TOKEN is set on the server, leave this empty and click Unlock.
      </p>
    </div>
  );
}
