import { NextResponse } from "next/server";
import { isRequestAuthorized, isDbConnected, leadStats } from "@/lib/db";

// Serve per request — never statically export (needs DB + auth at runtime).
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!(await isRequestAuthorized(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Please sign in again." }, { status: 401 });
  }
  const [stats, db] = await Promise.all([leadStats(), isDbConnected()]);
  return NextResponse.json({ ok: true, stats, db });
}
