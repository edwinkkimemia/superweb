import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services/business-websites`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/ecommerce`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/ai-solutions`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services/seo`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/web-applications`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services/care-plans`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/schedule`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/work`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
