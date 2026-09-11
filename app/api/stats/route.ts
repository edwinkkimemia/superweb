import { NextResponse } from "next/server";
import { isAdminAuthorized, isDbConnected, leadStats } from "@/lib/db";

// Serve per request — never statically export (needs DB + auth at runtime).
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Invalid admin token." }, { status: 401 });
  }
  const stats = await leadStats();
  const db = await isDbConnected();
  return NextResponse.json({ ok: true, stats, db });
}
