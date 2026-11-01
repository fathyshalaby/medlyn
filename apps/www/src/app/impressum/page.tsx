import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { company } from "@/lib/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Impressum",
  `Legal notice for Medlyn, operated by ${company.legalName}.`,
  "/impressum",
);

export default function ImpressumPage() {
  return (
    <SiteFrame page="content">
      <article className="mx-auto max-w-[76rem] px-[1.6rem] pt-[4rem] pb-[10rem] tablet:px-[3.2rem]">
        <h1 className="text-heading-lg">Impressum</h1>
        <div className="mt-[3.2rem] flex max-w-[62rem] flex-col gap-[2.4rem] text-body-md text-text-secondary">
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">
              Information according to § 5 ECG
            </h2>
            <p>{company.legalName}</p>
            {company.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </section>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">Commercial register</h2>
            <p>{company.registerNumber}</p>
            <p>{company.court}</p>
          </section>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">Managing director</h2>
            <p>{company.managingDirector}</p>
          </section>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">Contact</h2>
            {company.email ? (
              <p>
                <a
                  className="rounded-[0.4rem] underline underline-offset-2 outline-hidden focus-visible:border-2 focus-visible:border-blue-500"
                  href={`mailto:${company.email}`}
                >
                  {company.email}
                </a>
              </p>
            ) : (
              <p>
                Book a call on this site:{" "}
                <Link
                  className="rounded-[0.4rem] underline underline-offset-2 outline-hidden focus-visible:border-2 focus-visible:border-blue-500"
                  href="/book"
                >
                  /book
                </Link>
              </p>
            )}
          </section>
          <section>
            <h2 className="mb-[0.8rem] text-body-lg text-text-primary">Product</h2>
            <p>Medlyn is a product of {company.legalName}.</p>
          </section>
          {company.vatId ? (
            <section>
              <h2 className="mb-[0.8rem] text-body-lg text-text-primary">VAT ID</h2>
              <p>{company.vatId}</p>
            </section>
          ) : null}
        </div>
      </article>
    </SiteFrame>
  );
}
