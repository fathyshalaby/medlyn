import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/site-frame";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return pageMetadata(post.title, post.description, `/blog/${post.slug}`);
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <SiteFrame page="content">
      <article className="mx-auto max-w-[76rem] px-[1.6rem] pt-[4rem] pb-[10rem] tablet:px-[3.2rem]">
        <p className="mb-[1.6rem] text-label-lg text-text-secondary">
          <Link
            href="/blog"
            className="rounded-[0.4rem] underline-offset-2 outline-hidden hover:underline focus-visible:underline"
          >
            Blog
          </Link>
          {" · "}
          {post.date} · {post.readingMinutes} min
        </p>
        <h1 className="text-heading-lg">{post.title}</h1>
        <div className="mt-[3.2rem] flex max-w-[62rem] flex-col gap-[2rem] text-body-lg text-text-secondary">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-[4.8rem] flex flex-wrap gap-[1.2rem]">
          <Link
            href="/book"
            className="inline-flex h-10 items-center rounded-[1.2rem] bg-orange-500 px-[1.4rem] text-body-sm text-text-invert-primary"
          >
            Book a call
          </Link>
          <Link
            href="/research"
            className="inline-flex h-10 items-center rounded-[1.2rem] bg-surface-primary px-[1.4rem] text-body-sm text-text-primary"
          >
            Read the research
          </Link>
        </div>
      </article>
    </SiteFrame>
  );
}
