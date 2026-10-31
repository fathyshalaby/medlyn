"use client";

import { useEffect, useRef } from "react";
import { CAL_ORIGIN } from "./site-config";

type CalApi = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const EMBED_SRC = "https://app.cal.eu/embed/embed.js";

let embedPromise: Promise<void> | null = null;

function loadCalEmbed(): Promise<void> {
  if (embedPromise) return embedPromise;
  embedPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = EMBED_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      embedPromise = null;
      reject(new Error("Cal.eu embed failed to load"));
    };
    document.head.appendChild(script);
  });
  return embedPromise;
}

export function BookingCalendar({
  calLink,
  name,
  email,
  notes,
  onBooked,
  onError,
}: {
  calLink: string;
  name: string;
  email: string;
  notes: string;
  onBooked: () => void;
  onError: () => void;
}) {
  const slotRef = useRef<HTMLDivElement>(null);
  const onBookedRef = useRef(onBooked);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onBookedRef.current = onBooked;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    let cancelled = false;
    loadCalEmbed()
      .then(() => {
        if (cancelled || !window.Cal) {
          if (!cancelled) onErrorRef.current();
          return;
        }
        window.Cal("init", { origin: CAL_ORIGIN });
        window.Cal("inline", {
          elementOrSelector: slot,
          calLink,
          config: { name, email, notes, theme: "light", layout: "month_view" },
        });
        window.Cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            if (!cancelled) onBookedRef.current();
          },
        });
      })
      .catch(() => {
        if (!cancelled) onErrorRef.current();
      });
    return () => {
      cancelled = true;
      slot.replaceChildren();
    };
  }, [calLink, email, name, notes]);

  return <div ref={slotRef} className="min-h-[40rem] w-full overflow-auto" />;
}
