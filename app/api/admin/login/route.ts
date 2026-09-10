import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminCookie";

/** Validate the admin token and set a httpOnly session cookie. */
export async function POST(req: Request) {
  let token = "";
  try {
    const body = (await req.json()) as { token?: unknown };
    token = String(body.token ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  const serverToken = process.env.ADMIN_TOKEN ?? "";
  // Dev mode (no ADMIN_TOKEN configured): one click-through, same as the open API.
  const valid = serverToken ? token === serverToken : true;
  if (!valid) {
    return NextResponse.json({ ok: false, error: "Invalid token. Ask your developer for ADMIN_TOKEN." }, { status: 401 });
  }

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
