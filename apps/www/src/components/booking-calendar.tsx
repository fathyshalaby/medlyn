"use client";

import { useEffect, useRef } from "react";

type CalApi = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const embedPromises = new Map<string, Promise<void>>();

function loadCalEmbed(embedSrc: string): Promise<void> {
  const existing = embedPromises.get(embedSrc);
  if (existing) return existing;
  const promise = new Promise<void>((resolve, reject) => {
    const found = document.querySelector<HTMLScriptElement>(`script[src="${embedSrc}"]`);
    if (found) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = embedSrc;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      embedPromises.delete(embedSrc);
      reject(new Error("Cal embed failed to load"));
    };
    document.head.appendChild(script);
  });
  embedPromises.set(embedSrc, promise);
  return promise;
}

export function BookingCalendar({
  calLink,
  origin,
  embedSrc,
  name,
  email,
  notes,
  onBooked,
  onError,
}: {
  calLink: string;
  origin: string;
  embedSrc: string;
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
    loadCalEmbed(embedSrc)
      .then(() => {
        if (cancelled || !window.Cal) {
          if (!cancelled) onErrorRef.current();
          return;
        }
        window.Cal("init", { origin });
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
  }, [calLink, email, embedSrc, name, notes, origin]);

  return <div ref={slotRef} className="min-h-[40rem] w-full overflow-auto" />;
}
