"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_LINK } from "@/lib/site";
import { SERVICE_OPTIONS } from "@/data/services";

const MEETING_TYPES = ["Video call (Google Meet)", "Phone call", "Nairobi office visit", "WhatsApp chat"];
const TIME_SLOTS = ["8–10am EAT", "10am–12pm EAT", "12–2pm EAT", "2–4pm EAT", "4–6pm EAT", "6–8pm EAT"];

function minDate(): string {
  const d = new Date(Date.now() + 24 * 3600 * 1000);
  return d.toISOString().slice(0, 10);
}

export default function ScheduleForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const type = String(data.get("meetingType") ?? MEETING_TYPES[0]);
    const date = String(data.get("date") ?? "");
    const slot = String(data.get("slot") ?? TIME_SLOTS[0]);
    const topic = String(data.get("topic") ?? SERVICE_OPTIONS[0]);
    const notes = String(data.get("notes") ?? "").trim();

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !date) {
      setStatus("error");
      setMessage("Please add your name, a valid email and a preferred date.");
      return;
    }
    setStatus("sending");
    setMessage("Reserving your slot…");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          projectType: `Meeting Request — ${type}`,
          budget: topic,
          message: `Preferred: ${date}, ${slot}. Notes: ${notes || "—"}`,
          sourcePage: "/schedule",
        }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Failed to send.");
      setSummary(`${type} · ${date}, ${slot}`);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send.");
    }
  }

  if (status === "done") {
    return (
      <div style={{ textAlign: "center", padding: "28px 6px" }}>
        <div style={{ fontSize: 52 }}>📅</div>
        <h3 style={{ marginTop: 10 }}>Meeting requested!</h3>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          <strong>{summary}</strong>
          <br />
          We confirm on email + WhatsApp within a few working hours.
        </p>
        <p style={{ marginTop: 10 }}>
          Urgent?{" "}
          <a href={PHONE_HREF} style={{ fontWeight: 800, color: "var(--blue)" }}>
            Call {PHONE_DISPLAY}
          </a>{" "}
          or{" "}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener" style={{ fontWeight: 800, color: "#1DA851" }}>
            WhatsApp us
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field">
          <label>Full name *</label>
          <input name="name" required placeholder="Jane Wanjiku" />
        </div>
        <div className="field">
          <label>Phone / WhatsApp</label>
          <input name="phone" placeholder="0715 135 141" />
        </div>
        <div className="field full">
          <label>Email *</label>
          <input name="email" type="email" required placeholder="you@company.co.ke" />
        </div>
        <div className="field">
          <label>Meeting type</label>
          <select name="meetingType">
            {MEETING_TYPES.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>What is it about?</label>
          <select name="topic">
            {SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Preferred date *</label>
          <input name="date" type="date" required min={minDate()} />
        </div>
        <div className="field">
          <label>Time slot</label>
          <select name="slot">
            {TIME_SLOTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label>Anything we should prepare?</label>
          <textarea name="notes" placeholder="e.g. I have a price list PDF and my current website is slow on phones." />
        </div>
      </div>
      <p className={`form-msg${status === "error" ? " err" : ""}`} style={{ marginTop: 10 }}>
        {message}
      </p>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={status === "sending"}
        style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
      >
        {status === "sending" ? "Reserving…" : "📅 Request Meeting →"}
      </button>
    </form>
  );
}
