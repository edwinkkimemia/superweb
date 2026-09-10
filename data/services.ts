export interface ServiceItem {
  slug: string;
  href: string;
  label: string;
  short: string;
  icon: string;
  image: string;
  price: string;
}

/** Central services catalogue — drives the nav dropdown, services page, footer and forms. */
export const SERVICES: ServiceItem[] = [
  {
    slug: "business-websites",
    href: "/services/business-websites",
    label: "Business Websites",
    short: "Company sites from KSh 35,000",
    icon: "🏢",
    image: "/images/service-business.jpg",
    price: "From KSh 35,000",
  },
  {
    slug: "ecommerce",
    href: "/services/ecommerce",
    label: "Ecommerce & M-Pesa",
    short: "Online shops from KSh 95,000",
    icon: "🛒",
    image: "/images/service-ecommerce.jpg",
    price: "From KSh 95,000",
  },
  {
    slug: "ai-solutions",
    href: "/services/ai-solutions",
    label: "AI Solutions",
    short: "Chatbots & automation from KSh 60,000",
    icon: "🤖",
    image: "/images/service-ai.jpg",
    price: "From KSh 60,000",
  },
  {
    slug: "seo",
    href: "/services/seo",
    label: "SEO Services",
    short: "Rank #1 from KSh 25,000/mo",
    icon: "🚀",
    image: "/images/service-seo.jpg",
    price: "From KSh 25,000/mo",
  },
  {
    slug: "web-applications",
    href: "/services/web-applications",
    label: "Web Applications",
    short: "Custom systems from KSh 250,000",
    icon: "⚙️",
    image: "/images/service-apps.jpg",
    price: "From KSh 250,000",
  },
  {
    slug: "care-plans",
    href: "/services/care-plans",
    label: "Care Plans",
    short: "Maintenance from KSh 5,000/mo",
    icon: "🛡️",
    image: "/images/service-care.jpg",
    price: "From KSh 5,000/mo",
  },
  {
    slug: "mobile-apps",
    href: "/services/mobile-apps",
    label: "Mobile Apps",
    short: "Android & iOS from KSh 350,000",
    icon: "📱",
    image: "/images/service-apps.jpg",
    price: "From KSh 350,000",
  },
  {
    slug: "cybersecurity",
    href: "/services/cybersecurity",
    label: "Cybersecurity",
    short: "Audits & hardening from KSh 45,000",
    icon: "🔒",
    image: "/images/service-care.jpg",
    price: "From KSh 45,000",
  },
  {
    slug: "it-support",
    href: "/services/it-support",
    label: "IT Support",
    short: "Business IT from KSh 20,000/mo",
    icon: "🖥️",
    image: "/images/service-business.jpg",
    price: "From KSh 20,000/mo",
  },
  {
    slug: "graphic-design",
    href: "/services/graphic-design",
    label: "Graphic & Visual Design",
    short: "Branding from KSh 15,000",
    icon: "🎨",
    image: "/images/work-fashion.jpg",
    price: "From KSh 15,000",
  },
];

export const SERVICE_OPTIONS = [
  "Business Website Design",
  "Ecommerce Website Development",
  "AI Solutions — Chatbots & Automation",
  "SEO Services Kenya",
  "Web Application Development",
  "Website Maintenance",
  "Mobile App Development",
  "Cybersecurity Services",
  "IT Support & Maintenance",
  "Graphic & Visual Design",
];
