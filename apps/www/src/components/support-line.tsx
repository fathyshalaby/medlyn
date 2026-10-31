import { cn } from "./cn";
import { supporters } from "./site-config";

const linkFocus =
  "rounded-[0.4rem] underline underline-offset-2 outline-hidden focus-visible:border-2 focus-visible:border-blue-500 focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

export function SupportLine({ className }: { className?: string }) {
  return (
    <p className={cn("text-center text-body-sm text-text-secondary", className)}>
      Supported by{" "}
      {supporters.map((supporter, index) => {
        const lead = index === 0 ? "" : index === supporters.length - 1 ? ", and " : ", ";
        const name = supporter.href ? (
          <a className={linkFocus} href={supporter.href} target="_blank" rel="noopener noreferrer">
            {supporter.name}
          </a>
        ) : (
          supporter.name
        );
        return (
          <span key={supporter.name}>
            {lead}
            {name}
          </span>
        );
      })}
      .
    </p>
  );
}
