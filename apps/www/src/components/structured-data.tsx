import {
  appUrl,
  bookDescription,
  contentUpdatedAt,
  decisionModelSentence,
  faqQuestions,
  paperPath,
  paperTitle,
  researchCaveat,
  researchDescription,
  siteDescription,
  siteName,
  siteUrl,
  visionDescription,
} from "@/lib/seo";

type FaqEntry = { question: string; answer: string };

export type PublicPage = "home" | "vision" | "research" | "book" | "content";

export function StructuredData({
  page = "home",
  questions = faqQuestions,
}: {
  page?: PublicPage;
  questions?: readonly FaqEntry[];
}) {
  const organizationId = new URL("/#organization", siteUrl).href;
  const websiteId = new URL("/#website", siteUrl).href;
  const softwareId = new URL("/#software", siteUrl).href;
  const showFaq = page === "home" && questions.length > 0;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: siteUrl.href,
        logo: new URL("/images/apple-touch-icon.png", siteUrl).href,
        description: `${siteDescription} ${decisionModelSentence}`,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteName,
        url: siteUrl.href,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": organizationId },
        about: { "@id": softwareId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: siteName,
        url: appUrl.href,
        description: siteDescription,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        publisher: { "@id": organizationId },
      },
      ...(showFaq
        ? [
            {
              "@type": "FAQPage",
              "@id": new URL("/#faq", siteUrl).href,
              url: new URL("/#faq", siteUrl).href,
              isPartOf: { "@id": websiteId },
              mainEntity: questions.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ]
        : []),
      ...(page === "vision"
        ? [
            {
              "@type": "AboutPage",
              "@id": new URL("/vision#page", siteUrl).href,
              url: new URL("/vision", siteUrl).href,
              name: "Vision",
              description: visionDescription,
              isPartOf: { "@id": websiteId },
              about: { "@id": organizationId },
              mainEntity: { "@id": organizationId },
            },
          ]
        : []),
      ...(page === "research"
        ? [
            {
              "@type": "TechArticle",
              "@id": new URL("/research#report", siteUrl).href,
              headline: paperTitle,
              name: paperTitle,
              url: new URL("/research", siteUrl).href,
              description: `${researchDescription} ${researchCaveat}`,
              inLanguage: "en",
              dateModified: contentUpdatedAt,
              author: {
                "@type": "Person",
                name: "Julian Schmidt",
                affiliation: { "@id": organizationId },
              },
              publisher: { "@id": organizationId },
              isPartOf: { "@id": websiteId },
              encoding: {
                "@type": "MediaObject",
                contentUrl: new URL(paperPath, siteUrl).href,
                encodingFormat: "application/pdf",
                name: paperTitle,
              },
            },
          ]
        : []),
      ...(page === "book"
        ? [
            {
              "@type": "ContactPage",
              "@id": new URL("/book#page", siteUrl).href,
              url: new URL("/book", siteUrl).href,
              name: "Book a call",
              description: bookDescription,
              isPartOf: { "@id": websiteId },
              about: { "@id": softwareId },
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: escape HTML delimiters before embedding JSON-LD.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
