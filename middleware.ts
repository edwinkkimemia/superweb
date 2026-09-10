import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "./lib/adminCookie";

/**
 * Server-side gate for the admin area. The login page sets a httpOnly
 * cookie; without a valid one, protected pages bounce to /admin/login
 * before anything renders — no client-side flash of content.
 */
export function middleware(req: NextRequest) {
  const serverToken = process.env.ADMIN_TOKEN ?? "";
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
  const ok = serverToken
    ? cookie !== "" && cookie === serverToken
    : cookie !== ""; // dev mode: must still pass through login once
  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/overview/:path*", "/admin/leads/:path*", "/admin/settings/:path*"],
};
