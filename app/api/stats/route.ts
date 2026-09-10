import { NextResponse } from "next/server";
import { isAdminAuthorized, isDbConnected, leadStats } from "@/lib/db";

export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Invalid admin token." }, { status: 401 });
  }
  const stats = await leadStats();
  const db = await isDbConnected();
  return NextResponse.json({ ok: true, stats, db });
}
