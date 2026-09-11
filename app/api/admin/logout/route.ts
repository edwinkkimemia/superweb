import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminCookie";
import { deleteDbSession, getSessionCookie } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Revoke the admin session (if DB-backed) and clear the session cookie. */
export async function POST(req: Request) {
  const session = getSessionCookie(req);
  if (session && !session.includes(".")) {
    await deleteDbSession(session); // HMAC/dev markers need no revocation
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
