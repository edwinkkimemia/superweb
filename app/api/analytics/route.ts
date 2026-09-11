import { NextResponse } from "next/server";
import { analyticsSummary, isRequestAuthorized } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Admin-only traffic summary for the Analytics dashboard. */
export async function GET(req: Request) {
  if (!(await isRequestAuthorized(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Please sign in again." }, { status: 401 });
  }
  try {
    const summary = await analyticsSummary();
    return NextResponse.json({ ok: true, summary });
  } catch (err) {
    console.error("analyticsSummary failed", err);
    return NextResponse.json({ ok: false, error: "Could not load analytics." }, { status: 500 });
  }
}
