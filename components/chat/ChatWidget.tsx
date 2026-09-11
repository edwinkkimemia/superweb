"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WHATSAPP_LINK } from "@/lib/site";

interface Msg {
  from: "bot" | "user";
  text: string;
}

const QUICK_REPLIES = ["Prices 💰", "AI Solutions 🤖", "Mobile Apps 📱", "Talk to human 📞"];

function botReply(input: string): string {
  const t = input.toLowerCase();
  if (/(price|cost|charge|quote|much)/.test(t))
    return "Websites from KSh 35,000, ecommerce from KSh 95,000, AI from KSh 60,000, mobile apps from KSh 350,000, cybersecurity from KSh 45,000, IT support from KSh 20,000/mo, design from KSh 15,000. Grab an exact fixed quote in 2 minutes at /quote — or tap 'Talk to human'.";
  if (/(ai|bot|automat|chatbot)/.test(t))
    return "Our AI assistants answer customers on WhatsApp 24/7 in English & Swahili, qualify leads and book appointments — from KSh 60,000. See /services/ai-solutions or tap 'Talk to human' for a free demo.";
  if (/(seo|google|rank)/.test(t))
    return "Our SEO retainers (from KSh 25,000/mo) get Kenyan businesses ranking for 'your service + Nairobi'. Includes keywords, content and monthly reports.";
  if (/(shop|ecommerce|e-commerce|mpesa|m-pesa|sell|store)/.test(t))
    return "Our ecommerce stores come with M-Pesa STK Push, delivery zones and discounts — from KSh 95,000, live in 4–5 weeks.";
  if (/(app|android|ios|mobile|play store)/.test(t))
    return "We build Android & iOS business apps with M-Pesa payments from KSh 350,000 — design, build, testing and store launch handled. See /services/mobile-apps.";
  if (/(secur|hack|malware|cyber|ssl)/.test(t))
    return "Our cybersecurity audits start at KSh 45,000 — malware cleanup, hardening, SSL, backups and monitoring. See /services/cybersecurity.";
  if (/(it support|computer|network|wifi|email setup|printer)/.test(t))
    return "Our IT support plans run KSh 20,000–80,000/month — computers, networks, email, backups and on-call help. See /services/it-support.";
  if (/(logo|brand|design|graphic|visual|social media kit|packaging)/.test(t))
    return "Our design studio does logos, branding and social kits from KSh 15,000 — you own all source files. See /services/graphic-design.";
  if (/(time|long|fast|duration)/.test(t))
    return "Business sites take 2–3 weeks, ecommerce 3–5 weeks, AI add-ons about 2 weeks. Timelines are written into your contract.";
  if (/(human|call|phone|whatsapp|talk|meet|contact)/.test(t))
    return "You can reach our Nairobi team on 0715135141 (8am–8pm EAT) — or tap the green WhatsApp button and we'll reply fast. Prefer a sit-down? Hit 'Schedule Meeting' up top.";
  if (/(hi|hello|hey|habari|niaje)/.test(t))
    return "Habari! 👋 I'm the SuperWeb assistant. Ask me about prices, AI, mobile apps, cybersecurity, IT support or design — or tap a shortcut below.";
  if (/(thank|asante)/.test(t)) return "Karibu sana! Anything else — prices, timelines, AI demos?";
  return "Good question! I can help with websites, AI, mobile apps, cybersecurity, IT support, design, ecommerce and SEO. For anything detailed, tap 'Talk to human' and our team replies within hours.";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Habari! 👋 I'm the SuperWeb assistant. How can I help — prices, AI, timelines?" },
  ]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;
    setMsgs((m) => [...m, { from: "user", text: clean }]);
    setValue("");
    setTyping(true);
    const reply = botReply(clean);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: reply }]);
      setTyping(false);
    }, 700);
  }

  return (
    <div className="chat-root">
      {open && (
        <div className="chat-panel" role="dialog" aria-label="SuperWeb assistant">
          <div className="chat-head">
            <span className="chat-avatar">S</span>
            <span>
              <strong>SuperWeb Assistant</strong>
              <small><i className="chat-dot" /> Online — replies instantly</small>
            </span>
            <button className="chat-x" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.text}
              </div>
            ))}
            {typing && <div className="chat-msg bot typing">•••</div>}
          </div>
          <div className="chat-chips">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() =>
                  q.startsWith("Talk")
                    ? window.open(WHATSAPP_LINK, "_blank")
                    : send(q.replace(/ [^a-zA-Z0-9 ]/gu, ""))
                }
              >
                {q}
              </button>
            ))}
          </div>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(value);
            }}
          >
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask about prices, AI…"
              aria-label="Type your message"
            />
            <button type="submit" aria-label="Send">➤</button>
          </form>
          <div className="chat-foot">
            Prefer humans? <Link href={WHATSAPP_LINK} target="_blank">WhatsApp 0715135141</Link>
          </div>
        </div>
      )}
      <button
        className={`chat-fab${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
