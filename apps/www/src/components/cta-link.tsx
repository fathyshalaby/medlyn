import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "./cn";

const focus =
  "outline-hidden focus-visible:border-blue-500 focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

export function CtaLink({
  href,
  children,
  tone = "orange",
}: {
  href: string;
  children: ReactNode;
  tone?: "orange" | "plain";
}) {
  const className = cn(
    "inline-flex h-10 items-center rounded-[1.2rem] border-2 border-transparent px-[1.4rem] text-body-sm",
    focus,
    tone === "orange"
      ? "bg-orange-500 text-text-invert-primary hover:bg-surface-tertiary"
      : "bg-surface-primary text-text-primary hover:bg-surface-tertiary hover:text-text-tertiary",
  );
  if (href.startsWith("http") || href.endsWith(".pdf")) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
