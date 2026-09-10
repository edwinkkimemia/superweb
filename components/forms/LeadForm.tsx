"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

import { SERVICE_OPTIONS } from "@/data/services";

const BUDGET_OPTIONS = ["KSh 35k — 80k", "KSh 80k — 200k", "KSh 200k — 500k", "KSh 500k+", "Need advice"];

export default function LeadForm({ source, compact = false }: { source: string; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [refId, setRefId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim() || undefined,
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim() || undefined,
      projectType: String(data.get("projectType") ?? SERVICE_OPTIONS[0]),
      budget: String(data.get("budget") ?? BUDGET_OPTIONS[4]),
      message: String(data.get("message") ?? "").trim() || undefined,
      sourcePage: source,
    };
    if (payload.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setStatus("error");
      setMessage("Please add your full name and a valid email.");
      return;
    }
    setStatus("sending");
    setMessage("Sending…");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; lead?: { id: number } };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Failed to send.");
      setName(payload.name.split(" ")[0] ?? "friend");
      setEmail(payload.email);
      setRefId(json.lead?.id ?? null);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send.");
    }
  }

  if (status === "done") {
    return (
      <div style={{ textAlign: "center", padding: "28px 6px" }}>
        <div style={{ fontSize: 46 }}>✅</div>
        <h3 style={{ marginTop: 10 }}>Asante, {name}! Quote request received.</h3>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          Reference <strong>#{refId ?? "—"}</strong>. Our Nairobi team replies within 24 hours to{" "}
          <strong>{email}</strong>.
        </p>
        <p style={{ marginTop: 10 }}>
          Urgent?{" "}
          <a href={PHONE_HREF} style={{ fontWeight: 800, color: "var(--blue)" }}>
            Call {PHONE_DISPLAY}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field">
          <label>{compact ? "Name *" : "Full name *"}</label>
          <input name="name" required placeholder="Jane Wanjiku" />
        </div>
        {!compact && (
          <div className="field">
            <label>Company / Business</label>
            <input name="company" placeholder="Wanjiku Enterprises Ltd" />
          </div>
        )}
        <div className="field">
          <label>Phone *</label>
          <input name="phone" required={compact} placeholder="0715 135 141" />
        </div>
        <div className={`field${compact ? " full" : ""}`}>
          <label>{compact ? "Email *" : "Business email *"}</label>
          <input name="email" type="email" required placeholder="you@company.co.ke" />
        </div>
        <div className="field">
          <label>Service needed</label>
          <select name="projectType">
            {SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Budget</label>
          <select name="budget">
            {BUDGET_OPTIONS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        {!compact && (
          <div className="field full">
            <label>Project details</label>
            <textarea
              name="message"
              placeholder="e.g. I run a hardware shop in Nakuru. I need a company website with catalogue + M-Pesa."
            />
          </div>
        )}
      </div>
      <p className={`form-msg${status === "error" ? " err" : ""}`} style={{ marginTop: 10 }}>
        {message}
      </p>
      <button
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : compact ? "Request Free Quote →" : "Send & Get My Quote →"}
      </button>
    </form>
  );
}
