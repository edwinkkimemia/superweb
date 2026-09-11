import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminCookie";
import {
  createDbSession,
  rateLimited,
  SESSION_MAX_AGE_SEC,
  signSessionToken,
  verifyAdminCredentials,
} from "@/lib/db";

export const dynamic = "force-dynamic";

/** Validate the admin email + password and set a httpOnly session cookie. */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }
  let email = "";
  let password = "";
  try {
    const body = (await req.json()) as { email?: unknown; password?: unknown };
    email = String(body.email ?? "").trim();
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }

  // DB user wins → env bootstrap credentials → empty dev click-through.
  const check = await verifyAdminCredentials(email, password);
  if (!check.ok) {
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }

  // Issue a session: HMAC-stateless when an env password exists (works with or
  // without a database), a DB row when the password lives only in Postgres,
  // and a dev marker when nothing is configured at all.
  const cleanEmail = email.trim().toLowerCase();
  const envKey = process.env.ADMIN_PASSWORD ?? "";
  let session: string;
  if (envKey) {
    session = signSessionToken(cleanEmail, envKey);
  } else if (check.via === "db") {
    try {
      session = await createDbSession(cleanEmail);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Could not create a session. Please try again." },
        { status: 503 }
      );
    }
  } else {
    session = "dev";
  }

  const res = NextResponse.json({ ok: true, dev: check.via === "dev" });
  res.cookies.set(ADMIN_COOKIE, session, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SEC,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
