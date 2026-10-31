import Link from "next/link";
import { decisionModelSentence } from "@/lib/seo";
import { SupportLine } from "./support-line";

const linkFocus =
  "rounded-[0.4rem] underline underline-offset-2 outline-hidden focus-visible:border-2 focus-visible:border-blue-500 focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

export function DecisionBand() {
  return (
    <section
      aria-label="Decision model and support"
      className="bg-background-primary px-[1.6rem] pt-[6.4rem] text-center tablet:px-[3.2rem]"
    >
      <p className="mx-auto max-w-[76rem] text-body-lg text-text-primary">
        {decisionModelSentence}{" "}
        <Link className={linkFocus} href="/research">
          Read the paper
        </Link>
        .
      </p>
      <SupportLine className="mx-auto mt-[1.6rem] max-w-[76rem]" />
    </section>
  );
}
