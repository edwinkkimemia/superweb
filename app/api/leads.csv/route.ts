import { NextResponse } from "next/server";
import { isAdminAuthorized, listLeads } from "@/lib/db";

// Serve per request — never statically export (needs DB + auth at runtime).
export const dynamic = "force-dynamic";

function csvCell(v: unknown): string {
  const s = String(v ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Invalid admin token." }, { status: 401 });
  }
  const leads = await listLeads(1000);
  const header = ["id", "name", "company", "email", "phone", "service", "budget", "message", "source", "status", "created_at"];
  const rows = leads.map((l) =>
    [
      l.id,
      l.name,
      l.company ?? "",
      l.email,
      l.phone ?? "",
      l.projectType,
      l.budget,
      (l.message ?? "").replace(/\r?\n/g, " "),
      l.sourcePage ?? "/",
      l.status,
      l.createdAt,
    ]
      .map(csvCell)
      .join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="superweb-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
