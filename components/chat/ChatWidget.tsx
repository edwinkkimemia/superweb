"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WHATSAPP_LINK } from "@/lib/site";

interface Msg {
  from: "bot" | "user";
  text: string;
}

const QUICK_REPLIES = ["Prices 💰", "AI Solutions 🤖", "Talk to human 📞"];

function botReply(input: string): string {
  const t = input.toLowerCase();
  if (/(price|cost|charge|quote|much)/.test(t))
    return "Our websites start at KSh 35,000, ecommerce from KSh 95,000, and AI chatbots from KSh 60,000. Every quote is fixed in writing — want me to connect you for an exact figure?";
  if (/(ai|bot|automat|chatbot)/.test(t))
    return "Our AI assistants answer customers on WhatsApp 24/7 in English & Swahili, qualify leads and book appointments — from KSh 60,000. See /services/ai-solutions or tap 'Talk to human' for a free demo.";
  if (/(seo|google|rank)/.test(t))
    return "Our SEO retainers (from KSh 25,000/mo) get Kenyan businesses ranking for 'your service + Nairobi'. Includes keywords, content and monthly reports.";
  if (/(shop|ecommerce|e-commerce|mpesa|m-pesa|sell|store)/.test(t))
    return "Our ecommerce stores come with M-Pesa STK Push, delivery zones and discounts — from KSh 95,000, live in 4–5 weeks.";
  if (/(time|long|fast|duration)/.test(t))
    return "Business sites take 2–3 weeks, ecommerce 3–5 weeks, AI add-ons about 2 weeks. Timelines are written into your contract.";
  if (/(human|call|phone|whatsapp|talk|meet|contact)/.test(t))
    return "You can reach our Nairobi team on 0715135141 (8am–8pm EAT) — or tap the green WhatsApp button and we'll reply fast. Prefer a sit-down? Hit 'Schedule Meeting' up top.";
  if (/(hi|hello|hey|habari|niaje)/.test(t))
    return "Habari! 👋 I'm the SuperWeb assistant. Ask me about prices, AI solutions, ecommerce or SEO — or tap a shortcut below.";
  if (/(thank|asante)/.test(t)) return "Karibu sana! Anything else — prices, timelines, AI demos?";
  return "Good question! I can help with prices, timelines, AI solutions, ecommerce and SEO. For anything detailed, tap 'Talk to human' and our team replies within hours.";
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
                    : send(q.replace(/ [💰🤖📞]/u, ""))
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
