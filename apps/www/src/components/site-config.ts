// Outbound destinations and public navigation for the Medlyn site.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.medlyn.health";
export const CAL_ORIGIN = "https://cal.eu";

/** Cal.eu event path, for example `medlyn/clinic`. Empty until configured. */
export function calEventPath(): string {
  const raw = process.env.NEXT_PUBLIC_CAL_LINK?.trim() ?? "";
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      return new URL(raw).pathname.replace(/^\/+|\/+$/g, "");
    } catch {
      return "";
    }
  }
  return raw.replace(/^\/+|\/+$/g, "");
}

export function calBookingHref(): string {
  const path = calEventPath();
  return path ? `${CAL_ORIGIN}/${path}` : CAL_ORIGIN;
}

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
  { label: "Vision", href: "/vision" },
  { label: "Research", href: "/research" },
  { label: "Book a call", href: "/book" },
];

export const DEMO_LINK: PublicLink = {
  label: "Get started",
  href: APP_URL,
  external: true,
  theme: "orange",
};
