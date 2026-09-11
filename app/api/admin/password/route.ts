import { NextResponse } from "next/server";
import {
  isRequestAuthorized,
  rateLimited,
  setAdminPassword,
  verifyAdminCredentials,
} from "@/lib/db";

export const dynamic = "force-dynamic";

const MIN_PASSWORD_LEN = 8;

/** Change the admin password. Must already hold a valid admin session. */
export async function POST(req: Request) {
  if (!(await isRequestAuthorized(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Please sign in again." }, { status: 401 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please try again in a few minutes." },
      { status: 429 }
    );
  }
  let email = "";
  let currentPassword = "";
  let newPassword = "";
  try {
    const body = (await req.json()) as { email?: unknown; currentPassword?: unknown; newPassword?: unknown };
    email = String(body.email ?? "").trim();
    currentPassword = String(body.currentPassword ?? "");
    newPassword = String(body.newPassword ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }
  if (newPassword.length < MIN_PASSWORD_LEN) {
    return NextResponse.json(
      { ok: false, error: `New password must be at least ${MIN_PASSWORD_LEN} characters.` },
      { status: 400 }
    );
  }
  const check = await verifyAdminCredentials(email, currentPassword);
  if (!check.ok) {
    return NextResponse.json({ ok: false, error: "Current email or password is incorrect." }, { status: 401 });
  }
  try {
    await setAdminPassword(email, newPassword);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Could not save password." },
      { status: 503 }
    );
  }
  return NextResponse.json({ ok: true });
}
