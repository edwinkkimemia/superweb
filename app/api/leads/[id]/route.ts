import { NextResponse } from "next/server";
import { isRequestAuthorized, updateLeadStatus } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isRequestAuthorized(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Please sign in again." }, { status: 401 });
  }
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ ok: false, error: "Invalid lead id." }, { status: 400 });
  }
  let status = "";
  try {
    const body = (await req.json()) as Record<string, unknown>;
    status = String(body.status ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }
  try {
    const lead = await updateLeadStatus(id, status);
    if (!lead) return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}
