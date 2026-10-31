/** Public Cal booking config. Switch the event with NEXT_PUBLIC_CAL_LINK. */

const DEFAULT_ORIGIN = "https://cal.eu";

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/g, "");
}

function siteOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      return null;
    }
    return stripTrailingSlash(url.origin);
  } catch {
    return null;
  }
}

function pathFromHref(value: string): string {
  try {
    return new URL(value).pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return "";
  }
}

function embedScript(origin: string): string {
  const url = new URL(origin);
  const host = url.host.startsWith("app.") ? url.host : `app.${url.host}`;
  return `${url.protocol}//${host}/embed/embed.js`;
}

export type CalConfig = {
  /** True when NEXT_PUBLIC_CAL_LINK resolves to an event path. */
  configured: boolean;
  /** Cal host, for example https://cal.eu. Override with NEXT_PUBLIC_CAL_ORIGIN. */
  origin: string;
  /** Event path, for example medlyn/clinic. */
  eventPath: string;
  /** Absolute booking URL without guest prefills. */
  bookingHref: string;
  /** Embed script for the configured host. */
  embedSrc: string;
};

/**
 * Read Cal booking settings from public env.
 *
 * - `NEXT_PUBLIC_CAL_LINK`: event path (`medlyn/clinic`) or a full booking URL.
 * - `NEXT_PUBLIC_CAL_ORIGIN`: host to use with a bare path (default https://cal.eu).
 *   Ignored when `NEXT_PUBLIC_CAL_LINK` is already a full URL; that URL's origin wins.
 */
export function getCalConfig(): CalConfig {
  const configuredOrigin =
    siteOrigin(process.env.NEXT_PUBLIC_CAL_ORIGIN?.trim() || DEFAULT_ORIGIN) || DEFAULT_ORIGIN;
  const raw = process.env.NEXT_PUBLIC_CAL_LINK?.trim() ?? "";

  if (!raw) {
    return {
      configured: false,
      origin: configuredOrigin,
      eventPath: "",
      bookingHref: configuredOrigin,
      embedSrc: embedScript(configuredOrigin),
    };
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    const origin = siteOrigin(raw) || configuredOrigin;
    const eventPath = pathFromHref(raw);
    return {
      configured: Boolean(eventPath),
      origin,
      eventPath,
      bookingHref: eventPath ? `${origin}/${eventPath}` : origin,
      embedSrc: embedScript(origin),
    };
  }

  const eventPath = raw.replace(/^\/+|\/+$/g, "");
  return {
    configured: Boolean(eventPath),
    origin: configuredOrigin,
    eventPath,
    bookingHref: `${configuredOrigin}/${eventPath}`,
    embedSrc: embedScript(configuredOrigin),
  };
}

/** Absolute Cal URL with optional guest fields for the external fallback. */
export function calBookingHref(details?: {
  name?: string;
  email?: string;
  notes?: string;
}): string {
  const { bookingHref, configured } = getCalConfig();
  if (!configured || !details) return bookingHref;
  const url = new URL(bookingHref);
  if (details.name) url.searchParams.set("name", details.name);
  if (details.email) url.searchParams.set("email", details.email);
  if (details.notes) url.searchParams.set("notes", details.notes);
  return url.href;
}
