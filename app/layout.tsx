import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ChatWidget from "@/components/chat/ChatWidget";
import { FAVICON_SRC, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Website Design Kenya | Web Design Nairobi – SuperWeb",
    template: "%s | SuperWeb Kenya",
  },
  description:
    "SuperWeb is Nairobi's trusted website design company in Kenya. Business websites, ecommerce, AI solutions, SEO, mobile apps, cybersecurity, IT support and graphic design.",
  icons: { icon: FAVICON_SRC, apple: FAVICON_SRC },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ChatWidget />
      </body>
    </html>
  );
}
