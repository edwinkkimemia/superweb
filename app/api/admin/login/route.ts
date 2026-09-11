import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminCookie";

/** Validate the admin email + password and set a httpOnly session cookie. */
export async function POST(req: Request) {
  let email = "";
  let password = "";
  try {
    const body = (await req.json()) as { email?: unknown; password?: unknown };
    email = String(body.email ?? "").trim();
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const expectedEmail = (process.env.ADMIN_EMAIL ?? "").trim();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  // Dev mode (no credentials configured): leave both fields empty for one click-through.
  const emailOk = expectedEmail
    ? email.toLowerCase() === expectedEmail.toLowerCase()
    : email === "";
  const passwordOk = expectedPassword ? password === expectedPassword : password === "";
  if (!emailOk || !passwordOk) {
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }

  const serverToken = process.env.ADMIN_TOKEN ?? "";
  const res = NextResponse.json({ ok: true, dev: !serverToken });
  res.cookies.set(ADMIN_COOKIE, serverToken || "dev", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
