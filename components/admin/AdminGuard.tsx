"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

/** Shown instead of an endless spinner when the dashboard can't load. */
export function AdminGateError({ message }: { message: string }) {
  return (
    <AdminShell>
      <div className="card">
        <h3>⚠️ Dashboard unavailable</h3>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>{message}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <button className="btn btn-navy btn-sm" onClick={() => window.location.reload()}>
            ↻ Retry
          </button>
          <a className="btn btn-outline btn-sm" href="/admin/login">
            🔐 Back to Login
          </a>
        </div>
      </div>
    </AdminShell>
  );
}

export function useAdminGuard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [db, setDb] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function verify() {
      try {
        // Session cookie (set at login) authenticates this request.
        const res = await fetch("/api/stats");
        if (cancelled) return;
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        if (!res.ok) {
          setError("The dashboard API returned an error. Check Vercel logs, then try again.");
          setChecking(false);
          return;
        }
        let json: { db?: boolean };
        try {
          json = (await res.json()) as { db?: boolean };
        } catch {
          setError("The dashboard API returned an unreadable response. Check Vercel logs, then try again.");
          setChecking(false);
          return;
        }
        setDb(json.db ?? null);
        setChecking(false);
      } catch {
        if (cancelled) return;
        setError("Cannot reach the server. Check your connection, then try again.");
        setChecking(false);
      }
    }
    void verify();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return { checking, db, error };
}
