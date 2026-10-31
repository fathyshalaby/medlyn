import { CtaLink } from "@/components/cta-link";
import { SiteFrame } from "@/components/site-frame";
import { SupportLine } from "@/components/support-line";
import { decisionModelSentence, pageMetadata, visionDescription } from "@/lib/seo";

export const metadata = pageMetadata("Vision", visionDescription, "/vision");

export default function VisionPage() {
  return (
    <SiteFrame page="vision">
      <article className="mx-auto flex max-w-[96rem] flex-col px-[1.6rem] pt-[4rem] pb-[10rem] tablet:px-[3.2rem]">
        <h1 className="text-heading-xl">
          Every doctor.
          <br />
          <span className="italic">Every person.</span>
        </h1>
        <div className="mt-[3.2rem] flex max-w-[68rem] flex-col gap-[2.4rem] text-body-lg text-text-secondary">
          <p>
            A doctor’s day disappears into the record. The visit starts with a search. The fact that
            mattered sits on a page nobody reached. The person in the room gets whatever time is
            left.
          </p>
          <p>
            We are building the brief a clinician already trusts. A role, a task, and the facts that
            task needs, each one tied to the sentence it came from. What is missing stays missing. A
            contradiction stays in view.
          </p>
          <p>
            This is for every doctor, in every clinic, in every language, on every system. We want a
            clinician to walk in ready. Through that doctor, we want every person on earth to meet
            someone who had time to think about them.
          </p>
          <p className="text-text-primary">{decisionModelSentence}</p>
        </div>
        <div className="mt-[4.8rem] flex flex-wrap gap-[1.2rem]">
          <CtaLink href="/book">Book a call</CtaLink>
          <CtaLink href="/research" tone="plain">
            Read the research
          </CtaLink>
        </div>
        <SupportLine className="mt-[4.8rem] max-w-[68rem] text-left" />
      </article>
    </SiteFrame>
  );
}
