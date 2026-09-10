import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminCookie";

/** Clear the admin session cookie. */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
