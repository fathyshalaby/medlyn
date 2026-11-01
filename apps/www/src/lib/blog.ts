export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  paragraphs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "source-linked-clinical-briefs",
    title: "Source-linked clinical briefs, not another chart chat",
    description:
      "Why Medlyn starts from a clinician's role and task, keeps every fact attached to its passage, and checks statements before they reach the screen.",
    date: "2026-10-31",
    readingMinutes: 4,
    paragraphs: [
      "Clinicians do not need another fluent summary of a longitudinal record. They need the facts for the job in front of them, with a way to open the sentence those facts came from.",
      "Medlyn asks for a role and a task. It selects located facts from the patient's documents, renders them through registered templates, and keeps missing documentation and contradictions as separate states. The public demo still uses demo records only.",
      "Before a composed statement reaches a card, chat line, or letter, Medlyn's own decision model checks it against the cited passage. The method and the measurements are in the technical report. Those results are agent-reviewed, not clinician-reviewed, and do not establish clinical efficacy.",
      "If you want Medlyn inside a clinic system, book a call. The call is the conversation about fitting the brief to your record workflow.",
    ],
  },
  {
    slug: "from-hackathon-prototype-to-clinic-conversation",
    title: "From prototype to clinic conversation",
    description:
      "Medlyn began as a clinical documentation prototype. The public site now exists to help clinics try the demo and talk about bringing it into their systems.",
    date: "2026-10-31",
    readingMinutes: 3,
    paragraphs: [
      "Medlyn started as a focused clinical documentation prototype: one clinician, one task, source-linked patient facts. The product still lives by that boundary.",
      "The public site is now the front door for warm leads. Clinics can open the demo, read the research, and book a call about adding Medlyn to their record system. The demo remains on demo records.",
      "Medlyn is operated by influence solutions fm GmbH. The public site is the front door for clinics that want to try the demo and talk about bringing the brief into their systems.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
