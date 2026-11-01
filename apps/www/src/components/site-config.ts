import { calBookingHref, getCalConfig } from "@/lib/cal";

// Outbound destinations and public navigation for the Medlyn site.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.medlyn.health";

export { calBookingHref, getCalConfig };

export const AUSTRIAN_STARTUPS_URL = "https://www.austrianstartups.com/";
export const AIM_AUSTRIA_URL = "https://aim-austria.org/";

export type Supporter = { name: string; href?: string };

export const supporters: readonly Supporter[] = [
  { name: "Austrian Startups", href: AUSTRIAN_STARTUPS_URL },
  { name: "IM" },
  { name: "AIM Austria", href: AIM_AUSTRIA_URL },
  { name: "public funding" },
];

export type PublicLink = {
  label: string;
  href: string;
  external?: boolean;
  theme?: "white" | "orange";
};

export const NAV_LINKS: PublicLink[] = [
  { label: "Product", href: "/#product" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "Book a call", href: "/book" },
];

export const DEMO_LINK: PublicLink = {
  label: "Get started",
  href: APP_URL,
  external: true,
  theme: "orange",
};
