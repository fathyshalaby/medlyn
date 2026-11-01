import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import { blogPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Blog",
  "Notes on source-linked clinical briefs, Medlyn research, and bringing the product into clinic systems.",
  "/blog",
);

export default function BlogIndexPage() {
  return (
    <SiteFrame page="content">
      <article className="mx-auto max-w-[96rem] px-[1.6rem] pt-[4rem] pb-[10rem] tablet:px-[3.2rem]">
        <h1 className="text-heading-lg">
          Notes from
          <br />
          <span className="italic">the brief</span>
        </h1>
        <p className="mt-[2.4rem] max-w-[62rem] text-body-lg text-text-secondary">
          Short posts on what Medlyn is, how the decision model works, and how clinics can start a
          conversation about adding it to their system.
        </p>
        <ul className="mt-[4.8rem] flex max-w-[76rem] flex-col gap-[2.4rem]">
          {blogPosts.map((post) => (
            <li key={post.slug} className="border-t border-black/10 pt-[2.4rem]">
              <p className="mb-[0.8rem] text-label-lg text-text-secondary">
                {post.date} · {post.readingMinutes} min
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-heading-sm text-text-primary outline-hidden hover:underline focus-visible:underline"
              >
                {post.title}
              </Link>
              <p className="mt-[1.2rem] max-w-[62rem] text-body-md text-text-secondary">
                {post.description}
              </p>
            </li>
          ))}
        </ul>
      </article>
    </SiteFrame>
  );
}
