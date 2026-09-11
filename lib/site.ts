const rawSiteUrl = (process.env.SITE_URL ?? "").trim();
export const SITE_URL = (rawSiteUrl || "https://superweb.co.ke").replace(/\/$/, "");
export const PHONE_DISPLAY = "0715135141";
export const PHONE_HREF = "tel:0715135141";
export const PHONE_INTL = "254715135141";
export const EMAIL = "info@superweb.co.ke";
export const BRAND = "SuperWeb";

export const LOGO_SRC = "/logo/logo.png";
export const FAVICON_SRC = "/logo/fav.png";

export const WHATSAPP_LINK = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
  "Hi SuperWeb! I need a website for my business. Please send me a quote."
)}`;

const WA_SERVICE_LABEL: Record<string, string> = {
  "business-websites": "a business website",
  ecommerce: "an ecommerce website with M-Pesa",
  "ai-solutions": "an AI chatbot for my business",
  seo: "SEO services to rank on Google",
  "web-applications": "a custom web application",
  "care-plans": "a website care plan",
  "mobile-apps": "a mobile app (Android & iOS)",
  cybersecurity: "a cybersecurity audit",
  "it-support": "managed IT support",
  "graphic-design": "branding and visual design",
};

/** Prefilled WhatsApp message tailored to the page the visitor is on. */
export function whatsappMessageFor(pathname: string): string {
  const path = (pathname || "/").split("?")[0];
  if (path === "/quote" || path.startsWith("/quote/"))
    return "Hi SuperWeb! I'd like a free quote for my project. Here are my details:";
  if (path === "/offer" || path.startsWith("/offer/"))
    return "Hi SuperWeb! I'd like to claim my FREE homepage audit. My website is:";
  if (path === "/schedule" || path.startsWith("/schedule/"))
    return "Hi SuperWeb! I'd like to schedule a free consultation. I'm available:";
  if (path === "/contact" || path.startsWith("/contact/"))
    return "Hi SuperWeb! I have a question about your services.";
  if (path === "/pricing" || path.startsWith("/pricing/"))
    return "Hi SuperWeb! I saw your pricing and I'd like an exact quote for my project.";
  if (path === "/work" || path.startsWith("/work/"))
    return "Hi SuperWeb! I saw your portfolio and I want something similar for my business.";
  if (path === "/about" || path.startsWith("/about/"))
    return "Hi SuperWeb! I'd like to learn more about working with you.";
  const svc = Object.keys(WA_SERVICE_LABEL).find(
    (slug) => path === `/services/${slug}` || path.startsWith(`/services/${slug}/`)
  );
  if (svc)
    return `Hi SuperWeb! I'm interested in ${WA_SERVICE_LABEL[svc]}. Please send me a quote.`;
  if (path === "/services" || path.startsWith("/services/"))
    return "Hi SuperWeb! I'd like help choosing the right service. My business needs:";
  return "Hi SuperWeb! I need a website for my business. Please send me a quote.";
}

/** WhatsApp click-to-chat link with a page-aware prefilled message. */
export function whatsappLinkFor(pathname: string): string {
  return `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(whatsappMessageFor(pathname))}`;
}

export interface SocialLink {
  label: string;
  href: string;
  path: string;
}

/** Swap hrefs for real profile URLs when ready. */
export const SOCIALS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://facebook.com/superweb.co.ke",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/superweb.co.ke",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    label: "X",
    href: "https://x.com/superwebke",
    path: "M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L7.6 3.9H5.7L17.8 20z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/superweb-ke",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@superweb.ke",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
  },
];
