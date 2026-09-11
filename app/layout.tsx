import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { FAVICON_SRC, SITE_URL } from "@/lib/site";

const OG_TITLE = "Website Design Kenya | Web Design Nairobi – SuperWeb";
const OG_DESCRIPTION =
  "SuperWeb is Nairobi's trusted website design company in Kenya. Business websites, ecommerce, AI solutions, SEO, mobile apps, cybersecurity, IT support and graphic design.";
const OG_IMAGE = "/logo/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: OG_TITLE,
    template: "%s | SuperWeb Kenya",
  },
  description: OG_DESCRIPTION,
  icons: { icon: FAVICON_SRC, apple: FAVICON_SRC },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: "SuperWeb Kenya",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: "SuperWeb — Website Design Kenya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWidgets />
        <PageViewTracker />
      </body>
    </html>
  );
}
