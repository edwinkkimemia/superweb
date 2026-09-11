import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { trackPageView } from "@/lib/db";

export const dynamic = "force-dynamic";

const BOT_RE = /bot|crawl|slurp|spider|mediapartners|baidu|yandex|sogou|exabot|facebot|ia_archiver|ahrefs|semrush|mj12|dotbot|seznambot|petalbot/i;

/** First-party page-view beacon. Public, lightweight, bot-filtered. */
export async function POST(req: Request) {
  let path = "/";
  let ref = "";
  let width = 0;
  try {
    const body = (await req.json()) as { path?: unknown; ref?: unknown; w?: unknown };
    path = String(body.path ?? "/").slice(0, 255);
    ref = String(body.ref ?? "").slice(0, 255);
    width = Number(body.w ?? 0) || 0;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api")) {
    return NextResponse.json({ ok: true }); // never track admin/API noise
  }
  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_RE.test(ua)) return NextResponse.json({ ok: true });
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const country = (req.headers.get("x-vercel-ip-country") ?? "").slice(0, 8);
  const day = new Date().toISOString().slice(0, 10);
  const visitorHash = createHash("sha256").update(`${ip}|${ua}|${day}`).digest("hex");
  // Collapse external referrers to host so the table stays readable.
  let referrer = ref;
  try {
    if (ref && !ref.startsWith("/")) referrer = new URL(ref).hostname;
  } catch {
    referrer = "";
  }
  await trackPageView({
    path,
    referrer,
    country,
    device: width > 0 && width < 768 ? "mobile" : "desktop",
    visitorHash,
  });
  return NextResponse.json({ ok: true });
}
