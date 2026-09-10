"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminHeaders, getAdminToken, withTokenQuery } from "@/lib/admin";

export function useAdminGuard() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [checking, setChecking] = useState(true);
  const [db, setDb] = useState<boolean | null>(null);

  useEffect(() => {
    const t = getAdminToken();
    if (!t && process.env.NEXT_PUBLIC_ADMIN_LOCK !== "off") {
      // Still verify with API — dev mode allows empty token.
    }
    async function verify() {
      try {
        const res = await fetch(withTokenQuery("/api/stats", t), {
          headers: adminHeaders(t),
        });
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const json = (await res.json()) as { db?: boolean };
        setDb(json.db ?? null);
        setToken(t);
        setChecking(false);
      } catch {
        // Allow offline viewing with saved token; force login only if no token at all.
        if (!t) {
          router.replace("/admin/login");
          return;
        }
        setToken(t);
        setChecking(false);
      }
    }
    void verify();
  }, [router]);

  return { token, checking, db };
}
