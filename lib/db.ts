import { Pool } from "pg";
import type { Lead, LeadInput, LeadStats } from "./types";

// Cache the pool across Next.js dev hot-reloads / serverless invocations.
declare global {
  // eslint-disable-next-line no-var
  var __swPool: Pool | null | undefined;
}

const connectionString = process.env.DATABASE_URL;

function getPool(): Pool | null {
  if (!connectionString) return null;
  if (global.__swPool !== undefined) return global.__swPool;
  const pool = new Pool({
    connectionString,
    ssl:
      connectionString.includes("neon") ||
      connectionString.includes("supabase") ||
      connectionString.includes("render")
        ? { rejectUnauthorized: false }
        : undefined,
    max: 10,
  });
  global.__swPool = pool;
  return pool;
}

export const pool: Pool | null = getPool();

// In-memory fallback so `next dev` works without Postgres installed.
const memoryLeads: Lead[] = [];
let memoryId = 1;

export async function isDbConnected(): Promise<boolean> {
  const p = getPool();
  if (!p) return false;
  try {
    await p.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}

export async function ensureTables(): Promise<void> {
  const p = getPool();
  if (!p) return;
  await p.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      company VARCHAR(160),
      email VARCHAR(180) NOT NULL,
      phone VARCHAR(40),
      project_type VARCHAR(80) NOT NULL DEFAULT 'Business Website Design',
      budget VARCHAR(60) NOT NULL DEFAULT 'Let''s discuss',
      message TEXT,
      source_page VARCHAR(120) DEFAULT '/',
      status VARCHAR(30) NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    ALTER TABLE leads ADD COLUMN IF NOT EXISTS source_page VARCHAR(120) DEFAULT '/';
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
  `);
}

function toLead(row: Record<string, unknown>): Lead {
  return {
    id: Number(row.id),
    name: String(row.name ?? ""),
    company: (row.company as string) ?? undefined,
    email: String(row.email ?? ""),
    phone: (row.phone as string) ?? undefined,
    projectType: String(row.project_type ?? ""),
    budget: String(row.budget ?? ""),
    message: (row.message as string) ?? undefined,
    sourcePage: (row.source_page as string) ?? undefined,
    createdAt: new Date(row.created_at as string).toISOString(),
    status: String(row.status ?? "new"),
  };
}

export function validateLead(body: unknown):
  | { ok: true; value: LeadInput }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid payload." };
  const b = body as Record<string, unknown>;
  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim();
  const projectType = String(b.projectType ?? b.project_type ?? "Business Website Design").trim();
  const budget = String(b.budget ?? "Let's discuss").trim();
  const company = String(b.company ?? "").trim() || undefined;
  const phone = String(b.phone ?? "").trim() || undefined;
  const message = String(b.message ?? "").trim() || undefined;
  const sourcePage = String(b.sourcePage ?? b.source_page ?? "/").slice(0, 120) || "/";
  if (name.length < 2) return { ok: false, error: "Please provide your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Please provide a valid business email." };
  if (!projectType) return { ok: false, error: "Please choose a service." };
  return { ok: true, value: { name, company, email, phone, projectType, budget, message, sourcePage } };
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const p = getPool();
  if (!p) {
    const lead: Lead = { ...input, id: memoryId++, createdAt: new Date().toISOString(), status: "new" };
    memoryLeads.unshift(lead);
    return lead;
  }
  const result = await p.query(
    `INSERT INTO leads (name, company, email, phone, project_type, budget, message, source_page)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING id, name, company, email, phone, project_type, budget, message, source_page, status, created_at`,
    [input.name, input.company ?? null, input.email, input.phone ?? null, input.projectType, input.budget, input.message ?? null, input.sourcePage ?? "/"]
  );
  return toLead(result.rows[0]);
}

export async function listLeads(limit = 200): Promise<Lead[]> {
  const p = getPool();
  if (!p) return memoryLeads.slice(0, limit);
  const result = await p.query(
    `SELECT id, name, company, email, phone, project_type, budget, message, source_page, status, created_at
     FROM leads ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
  return result.rows.map(toLead);
}

export async function leadStats(): Promise<LeadStats> {
  const p = getPool();
  const rows: Array<{ projectType: string; status: string; sourcePage: string; createdAt: Date }> = p
    ? (
        await p.query(`SELECT project_type, status, source_page, created_at FROM leads ORDER BY created_at DESC LIMIT 1000`)
      ).rows.map((r) => ({
        projectType: String(r.project_type ?? ""),
        status: String(r.status ?? "new"),
        sourcePage: String(r.source_page ?? "/"),
        createdAt: new Date(r.created_at as string),
      }))
    : memoryLeads.map((l) => ({
        projectType: l.projectType,
        status: l.status,
        sourcePage: l.sourcePage ?? "/",
        createdAt: new Date(l.createdAt),
      }));
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sevenAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  const byStatus: Record<string, number> = {};
  const byProjectType: Record<string, number> = {};
  const bySource: Record<string, number> = {};
  let today = 0;
  let last7 = 0;
  for (const l of rows) {
    byStatus[l.status] = (byStatus[l.status] ?? 0) + 1;
    byProjectType[l.projectType] = (byProjectType[l.projectType] ?? 0) + 1;
    bySource[l.sourcePage] = (bySource[l.sourcePage] ?? 0) + 1;
    if (l.createdAt >= startOfToday) today++;
    if (l.createdAt >= sevenAgo) last7++;
  }
  return { total: rows.length, today, last7Days: last7, byStatus, byProjectType, bySource };
}

const ALLOWED_STATUSES = ["new", "contacted", "quoted", "won", "lost"];

export async function updateLeadStatus(id: number, status: string): Promise<Lead | null> {
  if (!ALLOWED_STATUSES.includes(status)) throw new Error("Invalid status.");
  const p = getPool();
  if (!p) {
    const lead = memoryLeads.find((l) => l.id === id);
    if (!lead) return null;
    lead.status = status;
    return lead;
  }
  const result = await p.query(
    `UPDATE leads SET status = $2 WHERE id = $1
     RETURNING id, name, company, email, phone, project_type, budget, message, source_page, status, created_at`,
    [id, status]
  );
  if (result.rows.length === 0) return null;
  return toLead(result.rows[0]);
}

function getCookie(req: Request, name: string): string {
  const header = req.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return "";
}

export function isAdminAuthorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN ?? "";
  if (!token) return true; // dev mode
  const url = new URL(req.url);
  const q = url.searchParams.get("token") ?? "";
  const h = req.headers.get("x-admin-token") ?? "";
  if (q === token || h === token) return true;
  // Accept the httpOnly session cookie set by /api/admin/login.
  return getCookie(req, "sw_admin") === token;
}

// Simple in-memory rate limit for lead submissions.
const hits = new Map<string, number[]>();
export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 15;
}
