"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminEmail } from "@/lib/admin";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function unlock(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setMsg("Signing in…");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Login failed.");
      setAdminEmail(email.trim());
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
        Sign in with your admin email and password.
      </p>
      <form onSubmit={(e) => void unlock(e)}>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@superweb.co.ke"
            autoComplete="username"
          />
        </div>
        <div className="field" style={{ marginTop: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
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
          {busy ? "Signing in…" : "Sign In →"}
        </button>
      </form>
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
        Dev mode: if no admin email/password is set on the server, leave both empty and click Sign In.
      </p>
    </div>
  );
}
