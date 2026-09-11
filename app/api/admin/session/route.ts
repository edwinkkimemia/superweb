import { NextResponse } from "next/server";
import { getSessionCookie, isValidAdminSession } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Session check used by the middleware gate. Always 200 with { ok }. */
export async function POST(req: Request) {
  const ok = await isValidAdminSession(getSessionCookie(req));
  return NextResponse.json({ ok });
}
