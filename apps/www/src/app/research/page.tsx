import { CtaLink } from "@/components/cta-link";
import { SiteFrame } from "@/components/site-frame";
import { SupportLine } from "@/components/support-line";
import {
  decisionModelSentence,
  pageMetadata,
  paperPath,
  researchCaveat,
  researchDescription,
} from "@/lib/seo";

export const metadata = pageMetadata("Research", researchDescription, "/research");

export default function ResearchPage() {
  return (
    <SiteFrame page="research">
      <article className="mx-auto flex max-w-[96rem] flex-col px-[1.6rem] pt-[4rem] pb-[10rem] tablet:px-[3.2rem]">
        <h1 className="text-heading-lg">
          The research
          <br />
          <span className="italic">behind the brief</span>
        </h1>
        <div className="mt-[3.2rem] flex max-w-[68rem] flex-col gap-[2.4rem] text-body-lg text-text-secondary">
          <p>
            A longitudinal record holds more than a clinician needs for the task in front of them. A
            fluent summary can still change what the record says.
          </p>
          <p>
            Medlyn maps a role and a task to the facts that task needs. A fact is stored only when
            its quote is in the passage. The model returns fact identifiers. Registered templates
            write the lines. A shared check stands between those lines and the clinician.
          </p>
          <p className="text-text-primary">
            {decisionModelSentence} The method and the measurements are in the technical report.
          </p>
          <p>{researchCaveat}</p>
        </div>
        <div className="mt-[4.8rem]">
          <CtaLink href={paperPath}>Read the paper</CtaLink>
        </div>
        <SupportLine className="mt-[4.8rem] max-w-[68rem] items-start" />
      </article>
    </SiteFrame>
  );
}
