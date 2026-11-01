import { SiteFrame } from "@/components/site-frame";
import { company } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Privacy",
  "How Medlyn handles information on the public website and booking flow.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <SiteFrame page="content">
      <article className="mx-auto max-w-[76rem] px-[1.6rem] pt-[4rem] pb-[10rem] tablet:px-[3.2rem]">
        <h1 className="text-heading-lg">Privacy</h1>
        <div className="mt-[3.2rem] flex max-w-[62rem] flex-col gap-[2.4rem] text-body-md text-text-secondary">
          <p>
            This notice covers the public Medlyn website operated by {company.legalName}. The
            patient demo uses demo records only and is not intended for real patient data.
          </p>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">What we collect</h2>
            <p>
              On this website we may process technical logs, analytics events, and the details you
              enter when you book a call. Booking details such as name, work email, organisation,
              and role are sent to Cal so the call can be scheduled.
            </p>
          </section>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">Why we process it</h2>
            <p>
              We use that information to operate the site, understand interest in Medlyn, answer
              booking requests, and improve the product conversation with clinics.
            </p>
          </section>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">Processors</h2>
            <p>
              Hosting and analytics may run on Vercel. Booking may run on Cal.eu. Those providers
              process data under their own terms for the services we use.
            </p>
          </section>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">Your rights</h2>
            <p>
              Depending on applicable law, you may ask for access, correction, deletion, or
              restriction of personal data we hold about you. Write to {company.legalName} at the
              address below, or use{" "}
              <a
                className="rounded-[0.4rem] underline underline-offset-2 outline-hidden focus-visible:border-2 focus-visible:border-blue-500"
                href="/book"
              >
                Book a call
              </a>
              .
            </p>
          </section>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">Contact</h2>
            <p>
              {company.legalName}
              <br />
              {company.addressLines.join(", ")}
            </p>
          </section>
        </div>
      </article>
    </SiteFrame>
  );
}
