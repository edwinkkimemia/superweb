"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminGuard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [db, setDb] = useState<boolean | null>(null);

  useEffect(() => {
    async function verify() {
      try {
        // Session cookie (set at login) authenticates this request.
        const res = await fetch("/api/stats");
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        const json = (await res.json()) as { db?: boolean };
        setDb(json.db ?? null);
        setChecking(false);
      } catch {
        router.replace("/admin/login");
      }
    }
    void verify();
  }, [router]);

  return { checking, db };
}
