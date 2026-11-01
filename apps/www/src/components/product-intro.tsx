import Link from "next/link";

const linkClass =
  "rounded-[0.4rem] underline underline-offset-2 outline-hidden focus-visible:border-2 focus-visible:border-blue-500 focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

const POINTS = [
  {
    title: "One role. One task.",
    body: "You say what you need for the visit. Medlyn reads the record and keeps only the facts that task needs.",
  },
  {
    title: "Every line has a source.",
    body: "Each fact opens the passage it came from. Missing facts stay missing. Contradictions stay in view.",
  },
  {
    title: "A decision model checks the statement.",
    body: "Before a line reaches the screen, Medlyn's own model checks it against the cited passage.",
  },
] as const;

export function ProductIntro() {
  return (
    <section
      id="product"
      aria-label="What Medlyn is"
      className="scroll-mt-[8rem] bg-background-primary px-[1.6rem] pt-[8rem] tablet:px-[3.2rem] tablet:pt-[10rem]"
    >
      <div className="mx-auto max-w-[96rem]">
        <p className="mb-[1.2rem] text-label-lg text-text-secondary">What Medlyn is</p>
        <h2 className="max-w-[76rem] text-heading-lg">
          The brief a clinician
          <br />
          <span className="italic">can defend</span>
        </h2>
        <p className="mt-[2.4rem] max-w-[68rem] text-body-lg text-text-secondary">
          Medlyn is clinical documentation software for clinics that want a source-linked patient
          view for the job in front of them. It is not a general chat over the chart. It selects
          located facts, renders them through checked templates, and keeps the demo on demo records
          until you bring it into your system.
        </p>
        <div className="mt-[4.8rem] grid gap-[2.4rem] tablet:grid-cols-3 tablet:gap-[3.2rem]">
          {POINTS.map((point) => (
            <div key={point.title} className="max-w-[32rem]">
              <p className="mb-[0.8rem] text-body-lg text-text-primary">{point.title}</p>
              <p className="text-body-md text-text-secondary">{point.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-[3.2rem] text-body-md text-text-secondary">
          Read the method in the{" "}
          <Link className={linkClass} href="/research">
            research
          </Link>
          , or{" "}
          <Link className={linkClass} href="/book">
            book a call
          </Link>{" "}
          about adding Medlyn to your record system.
        </p>
      </div>
    </section>
  );
}
