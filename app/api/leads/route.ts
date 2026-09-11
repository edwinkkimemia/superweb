import { NextResponse } from "next/server";
import { createLead, isAdminAuthorized, listLeads, rateLimited, updateLeadStatus, validateLead } from "@/lib/db";

// Serve per request — never statically export (needs DB + auth at runtime).
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Invalid admin token." }, { status: 401 });
  }
  const leads = await listLeads(200);
  return NextResponse.json({ ok: true, leads });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }
  const parsed = validateLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  try {
    const lead = await createLead(parsed.value);
    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch (err) {
    console.error("createLead failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your enquiry. Please email info@superweb.co.ke or call 0715135141." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Invalid admin token." }, { status: 401 });
  }
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
  }
  const id = Number(body.id);
  const status = String(body.status ?? "");
  if (!Number.isFinite(id)) {
    return NextResponse.json({ ok: false, error: "Invalid lead id." }, { status: 400 });
  }
  try {
    const lead = await updateLeadStatus(id, status);
    if (!lead) return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
    return NextResponse.json({ ok: true, lead });
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }
}
