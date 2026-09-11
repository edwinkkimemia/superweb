"use client";

import { usePathname } from "next/navigation";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ChatWidget from "@/components/chat/ChatWidget";

/** Floating contact widgets — hidden on admin pages to keep the CRM clean. */
export default function FloatingWidgets() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <WhatsAppFloat />
      <ChatWidget />
    </>
  );
}
