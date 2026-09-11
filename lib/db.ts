import { Pool } from "pg";
import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { ADMIN_COOKIE } from "./adminCookie";
import type { Lead, LeadInput, LeadStats } from "./types";

function scryptKey(
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
  opts: { N: number; r: number; p: number }
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCb(password, salt, keylen, opts, (err, key) =>
      err ? reject(err) : resolve(key as Buffer)
    );
  });
}

// Cache the pool across Next.js dev hot-reloads / serverless invocations.
declare global {
  // eslint-disable-next-line no-var
  var __swPool: Pool | null | undefined;
}

const connectionString = process.env.DATABASE_URL;

// Circuit breaker: after a connection-level failure, skip the pool briefly so
// pages fail fast (memory fallback) instead of hanging on timeouts.
let poolDisabledUntil = 0;

const CONN_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ENOTFOUND",
  "ETIMEDOUT",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "EAI_AGAIN",
  "28P01", // invalid_password — misconfigured DATABASE_URL
  "3D000", // invalid_catalog_name — wrong database name
]);

function isConnectionError(err: unknown): boolean {
  const code =
    typeof err === "object" && err !== null ? String((err as { code?: unknown }).code ?? "") : "";
  if (CONN_ERROR_CODES.has(code)) return true;
  const msg = err instanceof Error ? err.message : String(err);
  return /timeout|timed out|connection terminated|getaddrinfo|connect/i.test(msg);
}

/** Log for server logs; open the breaker for connection problems. */
function handleDbReadError(err: unknown): void {
  console.error("Database read failed; using memory fallback.", err);
  if (isConnectionError(err)) poolDisabledUntil = Date.now() + 60_000;
}

function getPool(): Pool | null {
  if (!connectionString) return null;
  if (Date.now() < poolDisabledUntil) return null;
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
    // Fail fast instead of hanging forever on an unreachable host (pg default is no timeout).
    connectionTimeoutMillis: 8000,
    query_timeout: 15000,
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
  } catch (err) {
    handleDbReadError(err);
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
  await p.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      email VARCHAR(180) PRIMARY KEY,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await p.query(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id VARCHAR(128) PRIMARY KEY,
      email VARCHAR(180) NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await p.query(`
    CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions (expires_at);
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
    // Breaker open with a configured DB = outage: fail loudly rather than silently dropping the lead.
    if (connectionString && Date.now() < poolDisabledUntil) {
      throw new Error("Database temporarily unavailable. Please try again in a minute.");
    }
    const lead: Lead = { ...input, id: memoryId++, createdAt: new Date().toISOString(), status: "new" };
    memoryLeads.unshift(lead);
    return lead;
  }
  try {
    const result = await p.query(
      `INSERT INTO leads (name, company, email, phone, project_type, budget, message, source_page)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, name, company, email, phone, project_type, budget, message, source_page, status, created_at`,
      [input.name, input.company ?? null, input.email, input.phone ?? null, input.projectType, input.budget, input.message ?? null, input.sourcePage ?? "/"]
    );
    return toLead(result.rows[0]);
  } catch (err) {
    handleDbReadError(err);
    throw err;
  }
}

export async function listLeads(limit = 200): Promise<Lead[]> {
  const p = getPool();
  if (!p) return memoryLeads.slice(0, limit);
  const run = () =>
    p
      .query(
        `SELECT id, name, company, email, phone, project_type, budget, message, source_page, status, created_at
         FROM leads ORDER BY created_at DESC LIMIT $1`,
        [limit]
      )
      .then((r) => r.rows.map(toLead));
  try {
    return await run();
  } catch (err) {
    if ((err as { code?: string })?.code === "42P01") {
      // Fresh database without tables — create them once and retry.
      try {
        await ensureTables();
        return await run();
      } catch (err2) {
        handleDbReadError(err2);
        return memoryLeads.slice(0, limit);
      }
    }
    handleDbReadError(err);
    if (!isConnectionError(err)) throw err; // real bug: stay loud
    return memoryLeads.slice(0, limit);
  }
}

export async function leadStats(): Promise<LeadStats> {
  const p = getPool();
  const fromMemory = () =>
    memoryLeads.map((l) => ({
      projectType: l.projectType,
      status: l.status,
      sourcePage: l.sourcePage ?? "/",
      createdAt: new Date(l.createdAt),
    }));
  let rows: Array<{ projectType: string; status: string; sourcePage: string; createdAt: Date }>;
  if (!p) {
    rows = fromMemory();
  } else {
    const run = () =>
      p
        .query(
          `SELECT project_type, status, source_page, created_at FROM leads ORDER BY created_at DESC LIMIT 1000`
        )
        .then((r) =>
          r.rows.map((row) => ({
            projectType: String(row.project_type ?? ""),
            status: String(row.status ?? "new"),
            sourcePage: String(row.source_page ?? "/"),
            createdAt: new Date(row.created_at as string),
          }))
        );
    try {
      rows = await run();
    } catch (err) {
      if ((err as { code?: string })?.code === "42P01") {
        try {
          await ensureTables();
          rows = await run();
        } catch (err2) {
          handleDbReadError(err2);
          rows = fromMemory();
        }
      } else {
        handleDbReadError(err);
        if (!isConnectionError(err)) throw err; // real bug: stay loud
        rows = fromMemory();
      }
    }
  }
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
  try {
    const result = await p.query(
      `UPDATE leads SET status = $2 WHERE id = $1
       RETURNING id, name, company, email, phone, project_type, budget, message, source_page, status, created_at`,
      [id, status]
    );
    if (result.rows.length === 0) return null;
    return toLead(result.rows[0]);
  } catch (err) {
    handleDbReadError(err);
    throw err;
  }
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

// ---------------------------------------------------------------------------
// Admin credentials — email + password, no tokens.
// Resolution order: admin_users row wins → ADMIN_EMAIL/ADMIN_PASSWORD env
// (bootstrap) → empty dev click-through when nothing is configured.
// Sessions: DB rows when Postgres is available, HMAC-signed stateless
// cookies (keyed on ADMIN_PASSWORD) for DB-less deployments, "dev" marker
// when nothing is configured at all.
// ---------------------------------------------------------------------------

export const SESSION_MAX_AGE_SEC = 7 * 24 * 3600;

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_KEYLEN = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptKey(password, salt, SCRYPT_KEYLEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });
  return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  try {
    const [algo, n, r, p, saltHex, keyHex] = stored.split("$");
    if (algo !== "scrypt" || !saltHex || !keyHex) return false;
    const expected = Buffer.from(keyHex, "hex");
    const key = await scryptKey(password, Buffer.from(saltHex, "hex"), expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
    });
    return key.length === expected.length && timingSafeEqual(key, expected);
  } catch {
    return false;
  }
}

export async function findAdminUser(
  email: string
): Promise<{ email: string; passwordHash: string } | null> {
  const p = getPool();
  if (!p) return null;
  try {
    await ensureTables();
    const r = await p.query(`SELECT email, password_hash FROM admin_users WHERE email = $1`, [
      email.trim().toLowerCase(),
    ]);
    if (r.rows.length === 0) return null;
    return { email: String(r.rows[0].email), passwordHash: String(r.rows[0].password_hash) };
  } catch (err) {
    handleDbReadError(err);
    return null;
  }
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<{ ok: boolean; via: "db" | "env" | "dev" }> {
  const cleanEmail = email.trim().toLowerCase();
  const user = cleanEmail ? await findAdminUser(cleanEmail) : null;
  if (user) return { ok: await verifyPassword(password, user.passwordHash), via: "db" };
  const expectedEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (expectedEmail || expectedPassword) {
    return { ok: cleanEmail === expectedEmail && password === expectedPassword, via: "env" };
  }
  return { ok: cleanEmail === "" && password === "", via: "dev" };
}

/** Create or replace the admin login. Requires Postgres (no memory fallback — sessions span instances). */
export async function setAdminPassword(email: string, newPassword: string): Promise<void> {
  const p = getPool();
  if (!p) throw new Error("No database connected. Set DATABASE_URL to change the password.");
  await ensureTables();
  const hash = await hashPassword(newPassword);
  await p.query(
    `INSERT INTO admin_users (email, password_hash, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = NOW()`,
    [email.trim().toLowerCase(), hash]
  );
  // Sign out other sessions for this account.
  try {
    await p.query(`DELETE FROM admin_sessions WHERE email = $1`, [email.trim().toLowerCase()]);
  } catch (err) {
    handleDbReadError(err);
  }
}

/** Stateless session token: email.expires.signature (HMAC-SHA256 with the env password). */
export function signSessionToken(email: string, key: string): string {
  const clean = email.trim().toLowerCase();
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC;
  const data = `${clean}.${expires}`;
  const sig = createHmac("sha256", key).update(data).digest("hex");
  return `${data}.${sig}`;
}

export function verifySessionToken(value: string, key: string): boolean {
  if (!value || !key) return false;
  const parts = value.split(".");
  if (parts.length < 3) return false;
  const sig = parts.pop()!;
  const expires = parts.pop()!;
  const email = parts.join(".");
  if (!/^[0-9a-f]{64}$/.test(sig) || !/^\d+$/.test(expires)) return false;
  if (!email.includes("@")) return false;
  if (Number(expires) * 1000 <= Date.now()) return false;
  const expected = createHmac("sha256", key).update(`${email}.${expires}`).digest();
  const actual = Buffer.from(sig, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/** DB-backed session row (used when no env password is configured). */
export async function createDbSession(email: string): Promise<string> {
  const p = getPool();
  if (!p) throw new Error("No database connected.");
  await ensureTables();
  const id = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + SESSION_MAX_AGE_SEC * 1000);
  await p.query(`INSERT INTO admin_sessions (id, email, expires_at) VALUES ($1, $2, $3)`, [
    id,
    email.trim().toLowerCase(),
    expires.toISOString(),
  ]);
  return id;
}

export async function deleteDbSession(id: string): Promise<void> {
  const p = getPool();
  if (!p) return;
  try {
    await p.query(`DELETE FROM admin_sessions WHERE id = $1`, [id]);
  } catch (err) {
    handleDbReadError(err);
  }
}

/** The single source of truth: is this session cookie currently valid? */
export async function isValidAdminSession(cookieValue: string): Promise<boolean> {
  if (!cookieValue) return false;
  const p = getPool();
  if (p) {
    try {
      const r = await p.query(`SELECT expires_at FROM admin_sessions WHERE id = $1`, [cookieValue]);
      if (r.rows.length > 0) {
        return new Date(r.rows[0].expires_at as string).getTime() > Date.now();
      }
    } catch (err) {
      handleDbReadError(err);
    }
  }
  const envKey = process.env.ADMIN_PASSWORD ?? "";
  if (envKey && verifySessionToken(cookieValue, envKey)) return true;
  if (cookieValue === "dev") {
    const hasEnv = (process.env.ADMIN_EMAIL ?? "") !== "" || envKey !== "";
    if (!hasEnv) {
      if (!p) return true;
      try {
        const r = await p.query(`SELECT 1 FROM admin_users LIMIT 1`);
        return r.rows.length === 0;
      } catch {
        return true; // DB down + no env creds → treat as dev
      }
    }
  }
  return false;
}

/** Async replacement for token auth: valid session cookie required (dev mode: completed login). */
export async function isRequestAuthorized(req: Request): Promise<boolean> {
  return isValidAdminSession(getSessionCookie(req));
}

/** Read the session cookie from a request. */
export function getSessionCookie(req: Request): string {
  return getCookie(req, ADMIN_COOKIE);
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
