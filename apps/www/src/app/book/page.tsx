import { BookingFunnel } from "@/components/booking-funnel";
import { getCalConfig } from "@/components/site-config";
import { SiteFrame } from "@/components/site-frame";
import { bookDescription, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Book a call", bookDescription, "/book");

const STEPS = ["Your clinic", "A short call", "We fit Medlyn to your record system"];

export default function BookPage() {
  const cal = getCalConfig();

  return (
    <SiteFrame page="book">
      <article className="mx-auto max-w-[96rem] px-[1.6rem] pt-[4rem] pb-[10rem] tablet:px-[3.2rem]">
        <div className="grid gap-[4.8rem] tablet:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] tablet:items-start tablet:gap-[6.4rem]">
          <div>
            <h1 className="max-w-[76rem] text-heading-lg">
              Add Medlyn
              <br />
              <span className="italic">to your system</span>
            </h1>
            <p className="mt-[2.4rem] max-w-[62rem] text-body-lg text-text-secondary">
              Tell us about your clinic, then pick a time. The call is how we talk about fitting
              Medlyn to your record system. The public demo still uses demo records only.
            </p>
            <ol className="mt-[3.2rem] flex max-w-[62rem] flex-col gap-[1.2rem] text-body-md text-text-primary">
              {STEPS.map((step, index) => (
                <li key={step}>
                  {index + 1}. {step}
                </li>
              ))}
            </ol>
          </div>
          <BookingFunnel
            bookingHref={cal.bookingHref}
            configured={cal.configured}
            embedSrc={cal.embedSrc}
            eventPath={cal.eventPath}
            origin={cal.origin}
          />
        </div>
      </article>
    </SiteFrame>
  );
}
