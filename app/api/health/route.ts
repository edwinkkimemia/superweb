import { NextResponse } from "next/server";
import { isDbConnected } from "@/lib/db";

export async function GET() {
  const db = await isDbConnected();
  return NextResponse.json({ ok: true, service: "superweb", db, time: new Date().toISOString() });
}
