import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Server-side gate for the admin area. Validates the session cookie against
 * /api/admin/session (DB rows, HMAC-stateless, or dev marker) before anything
 * renders — no client-side flash of content. Fails closed.
 */
export async function middleware(req: NextRequest) {
  try {
    const url = new URL("/api/admin/session", req.url);
    const res = await fetch(url, {
      method: "POST",
      headers: { cookie: req.headers.get("cookie") ?? "" },
    });
    if (res.ok) {
      const json = (await res.json()) as { ok?: boolean };
      if (json?.ok) return NextResponse.next();
    }
  } catch {
    /* fail closed → login */
  }
  const login = req.nextUrl.clone();
  login.pathname = "/admin/login";
  login.search = "";
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/admin",
    "/admin/overview/:path*",
    "/admin/analytics/:path*",
    "/admin/quotes/:path*",
    "/admin/schedules/:path*",
    "/admin/messages/:path*",
    "/admin/offers/:path*",
    "/admin/leads/:path*",
    "/admin/settings/:path*",
  ],
};
