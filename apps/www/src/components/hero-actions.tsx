import Link from "next/link";
import { cn } from "./cn";
import { APP_URL } from "./site-config";

const buttonFocus =
  "group-focus-visible/button:border-blue-500 group-focus-visible/button:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

/** Frosted pill with the demo action and a booking link. */
export function HeroActions({
  className,
  tone = "media",
}: {
  className?: string;
  tone?: "media" | "light";
}) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-[0.3rem]",
        "h-[50px] px-[0.3rem] py-[0.3rem]",
        "border border-solid border-[rgba(255,255,255,0.1)] bg-blur",
        className,
      )}
    >
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group/button relative isolate inline-flex h-full shrink-0 cursor-pointer text-body-sm outline-hidden"
      >
        <span
          className={cn(
            "z-10 flex w-full items-center rounded-ctas-button border-2 border-transparent bg-surface-primary px-[1.4rem] text-text-primary transition-colors",
            "group-hover/button:bg-surface-tertiary group-hover/button:text-text-tertiary group-active:bg-black-500 group-active:text-text-tertiary",
            buttonFocus,
          )}
        >
          Get started
        </span>
      </a>
      <Link
        href="/book"
        className="group/button relative isolate inline-flex h-full shrink-0 cursor-pointer text-body-sm outline-hidden"
      >
        <span
          className={cn(
            "z-10 flex w-full items-center gap-[0.8rem] rounded-ctas-button border-2 border-transparent px-[1.4rem] transition-colors",
            tone === "light"
              ? "bg-orange-500 text-text-invert-primary group-hover/button:bg-surface-tertiary group-active:bg-black-500"
              : "text-text-white group-hover/button:bg-white/15 group-active:bg-white/25",
            buttonFocus,
          )}
        >
          Book a call
        </span>
      </Link>
    </div>
  );
}
