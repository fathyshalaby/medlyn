import { cn } from "./cn";
import { supporters } from "./site-config";

const tagClass =
  "inline-flex items-center rounded-[1.2rem] border border-black/10 bg-surface-primary px-[1.2rem] py-[0.6rem] text-body-sm text-text-primary outline-hidden transition-colors hover:bg-surface-secondary focus-visible:border-blue-500 focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

export function SupportLine({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-[1.2rem]", className)}>
      <p className="text-label-lg text-text-secondary">Supported by</p>
      <ul className="flex flex-wrap items-center justify-center gap-[0.8rem]">
        {supporters.map((supporter) => (
          <li key={supporter.name}>
            {supporter.href ? (
              <a
                className={tagClass}
                href={supporter.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {supporter.name}
              </a>
            ) : (
              <span className={tagClass}>{supporter.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
