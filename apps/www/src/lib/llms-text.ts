import { appUrl, faqQuestions, paperPath, paperTitle, siteDescription, siteUrl } from "./seo";

function pageUrl(path: string): string {
  return new URL(path, siteUrl).href;
}

const pages = [
  { title: "Home", path: "/", note: "Source-linked patient summaries for a clinician's task" },
  { title: "Vision", path: "/vision", note: "Why Medlyn exists" },
  { title: "Research", path: "/research", note: "Technical report and decision model" },
  { title: paperTitle, path: paperPath, note: "PDF of the technical report" },
  { title: "Book a call", path: "/book", note: "Add Medlyn to a clinic system" },
  { title: "Demo", path: appUrl.href, note: "Try the demo on demo records" },
];

function pageList(): string {
  return pages
    .map((page) => {
      const href = page.path.startsWith("http") ? page.path : pageUrl(page.path);
      return `- [${page.title}](${href}): ${page.note}`;
    })
    .join("\n");
}

const intro = `${siteDescription}

Medlyn built its own decision model. It checks a statement against the passage it cites before that statement is shown. The method and the measurements are in the technical report. The results are agent-reviewed, not clinician-reviewed, and do not establish clinical efficacy.

Medlyn is supported by Austrian Startups, IM, AIM Austria, and public funding.

The public demo uses demo records only. A clinic that wants Medlyn in its own system can book a call.`;

export function llmsText(): string {
  return `# Medlyn

> Medlyn turns a clinician's role and task into patient facts, with each fact linked to its source.

${intro}

## Pages

${pageList()}

## Optional

- [Full description for answer engines](${pageUrl("/llms-full.txt")}): Product, vision, research, and common questions
`;
}

export function llmsFullText(): string {
  const answers = faqQuestions
    .map((entry) => `### ${entry.question}\n\n${entry.answer}`)
    .join("\n\n");
  return `# Medlyn

> Medlyn turns a clinician's role and task into patient facts, with each fact linked to its source.

${intro}

## Pages

${pageList()}

## Vision

Medlyn is building a brief every doctor can trust. The aim is every clinician, in every clinic, and through them every person whose care depends on a doctor who had time to think.

## Questions

${answers}
`;
}
