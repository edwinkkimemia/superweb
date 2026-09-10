import { NextResponse } from "next/server";

export async function GET() {
  // Projects are currently curated in the /work page.
  return NextResponse.json({ projects: [] });
}
