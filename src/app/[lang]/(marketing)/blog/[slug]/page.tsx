import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getLanguageTag, getLocalizedPath, locales } from "@/i18n/config";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import { JsonLd } from "@/modules/seo/jsonld/json-ld";
import { getBlogPostingJsonLd } from "@/modules/seo/jsonld/site-graph";
import { PostCard } from "@/modules/blog/components/post-card";
import { TableOfContents } from "@/modules/blog/components/table-of-contents";
import {
  getAdjacentPosts,
  getAllPostsMeta,
  getPostBySlug,
  getRelatedPosts,
} from "@/modules/blog/server/posts";
import { siteConfig } from "@/modules/site/configs/site";

type BlogPostPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllPostsMeta(lang).map((post) => ({ lang, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const post = await getPostBySlug(locale, slug);
  if (!post) return { title: dictionary.metadata.notFound };

  const { meta } = post;
  const title = meta.seoTitle ?? meta.title;
  const description = meta.seoDescription ?? meta.description ?? dictionary.site.description;
  const canonical = `/${locale}/blog/${meta.slug}`;
  const ogImage = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLocaleAlternates(`/blog/${meta.slug}`),
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url.replace(/\/$/, "")}${canonical}`,
      type: "article",
      publishedTime: meta.date,
      modifiedTime: meta.updated,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const { meta, content, toc } = post;
  const related = getRelatedPosts(locale, slug);
  const { prev, next } = getAdjacentPosts(locale, slug);
  const languageTag = getLanguageTag(locale);

  return (
    <article className="page-shell">
      <JsonLd
        data={getBlogPostingJsonLd({
          locale,
          title: meta.title,
          description: meta.description,
          datePublished: meta.date,
          dateModified: meta.updated,
          url: `${siteConfig.url.replace(/\/$/, "")}/${locale}/blog/${meta.slug}`,
        })}
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <header className="page-hero mb-10 px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-4" aria-hidden />
                <time dateTime={meta.date}>
                  {new Date(meta.date).toLocaleDateString(languageTag, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
              {meta.updated ? (
                <span className="text-xs">
                  {dictionary.common.updated}{" "}
                  {new Date(meta.updated).toLocaleDateString(languageTag, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1">
                <Clock className="size-4" aria-hidden />
                {meta.readingMinutes} {dictionary.common.minRead}
              </span>
              {meta.category ? <Badge variant="secondary">{meta.category}</Badge> : null}
            </div>
            <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {meta.title}
            </h1>
            {meta.description ? (
              <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
                {meta.description}
              </p>
            ) : null}
            {meta.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`${getLocalizedPath(locale, "/blog")}?tag=${encodeURIComponent(tag)}`}
                  >
                    <Badge variant="outline" className="font-normal hover:bg-accent">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : null}
          </header>

          <div
            className={[
              "surface-panel prose prose-neutral max-w-none rounded-[2rem] px-6 py-8 dark:prose-invert sm:px-8",
              "prose-headings:font-heading prose-headings:scroll-mt-24",
              "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
              "prose-pre:bg-transparent prose-pre:p-0",
              "prose-code:before:content-none prose-code:after:content-none",
            ].join(" ")}
          >
            {content}
          </div>

          <Separator className="my-12" />

          <nav
            className="flex flex-col gap-4 sm:flex-row sm:justify-between"
            aria-label="Post pagination"
          >
            {prev ? (
              <Link
                href={getLocalizedPath(locale, `/blog/${prev.slug}`)}
                className="group max-w-[min(100%,20rem)] rounded-[1.5rem] border border-border/70 bg-card/70 p-4 transition-colors hover:bg-muted/50"
              >
                <span className="text-xs text-muted-foreground">
                  {dictionary.common.older}
                </span>
                <p className="mt-1 font-medium group-hover:underline">{prev.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={getLocalizedPath(locale, `/blog/${next.slug}`)}
                className="group max-w-[min(100%,20rem)] rounded-[1.5rem] border border-border/70 bg-card/70 p-4 text-right transition-colors hover:bg-muted/50 sm:ml-auto"
              >
                <span className="text-xs text-muted-foreground">
                  {dictionary.common.newer}
                </span>
                <p className="mt-1 font-medium group-hover:underline">{next.title}</p>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          {related.length > 0 ? (
            <section className="mt-16">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                {dictionary.common.related}
              </h2>
              <ul className="mt-6 space-y-6">
                {related.map((relatedPost) => (
                  <li key={relatedPost.slug}>
                    <PostCard post={relatedPost} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {toc.length > 0 ? (
          <aside className="hidden lg:block">
            <TableOfContents items={toc} title={dictionary.common.onThisPage} />
          </aside>
        ) : null}
      </div>
    </article>
  );
}
