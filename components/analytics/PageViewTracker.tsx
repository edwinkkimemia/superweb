"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/** Fires a first-party page-view beacon on every public route change. */
export default function PageViewTracker() {
  const pathname = usePathname();
  const last = useRef<{ path: string; at: number }>({ path: "", at: 0 });

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    const now = Date.now();
    if (last.current.path === pathname && now - last.current.at < 3000) return; // dedupe StrictMode echo
    last.current = { path: pathname, at: now };
    try {
      const payload = JSON.stringify({
        path: pathname,
        ref: document.referrer || "",
        w: window.innerWidth || 0,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics/track", new Blob([payload], { type: "application/json" }));
      } else {
        void fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        });
      }
    } catch {
      /* analytics must never break the page */
    }
  }, [pathname]);

  return null;
}
