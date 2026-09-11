/** Enquiry buckets — splits the inbox by where the lead came from. Dependency-free. */

export type LeadBucket = "quotes" | "schedules" | "messages" | "offers" | "other";

export interface BucketDef {
  id: LeadBucket;
  label: string;
  icon: string;
  href: string;
  blurb: string;
}

export const LEAD_BUCKETS: BucketDef[] = [
  {
    id: "quotes",
    label: "Quotes",
    icon: "💰",
    href: "/admin/quotes",
    blurb: "Quote requests from the quote page, homepage & service pages.",
  },
  {
    id: "schedules",
    label: "Schedules",
    icon: "📅",
    href: "/admin/schedules",
    blurb: "Meeting bookings from the schedule page.",
  },
  {
    id: "messages",
    label: "Messages",
    icon: "✉️",
    href: "/admin/messages",
    blurb: "General contact messages.",
  },
  {
    id: "offers",
    label: "Audit Offers",
    icon: "🎁",
    href: "/admin/offers",
    blurb: "Free-audit claims from the offer page.",
  },
];

/** Map a lead's sourcePage (e.g. "/quote", "/services/seo") to its bucket. */
export function bucketForSource(sourcePage?: string): LeadBucket {
  const path = (sourcePage || "/").split("?")[0].toLowerCase();
  if (path === "/schedule" || path.startsWith("/schedule/")) return "schedules";
  if (path === "/contact" || path.startsWith("/contact/")) return "messages";
  if (path === "/offer" || path.startsWith("/offer/")) return "offers";
  if (
    path === "/" ||
    path === "/quote" ||
    path.startsWith("/quote/") ||
    path === "/services" ||
    path.startsWith("/services/") ||
    path === "/pricing" ||
    path.startsWith("/pricing/")
  )
    return "quotes";
  return "other";
}

/** Count leads per bucket from the /api/stats bySource map. */
export function countBuckets(bySource: Record<string, number>): Record<LeadBucket, number> {
  const counts: Record<LeadBucket, number> = {
    quotes: 0,
    schedules: 0,
    messages: 0,
    offers: 0,
    other: 0,
  };
  for (const [source, n] of Object.entries(bySource)) {
    counts[bucketForSource(source)] += n;
  }
  return counts;
}
