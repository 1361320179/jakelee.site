import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogListClient } from "@/modules/blog/components/blog-list-client";
import { getAllPostsMeta, getAllTags } from "@/modules/blog/server/posts";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import { siteConfig } from "@/modules/site/configs/site";

type BlogPageProps = {
  params: Promise<{ lang: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  return {
    title: dictionary.metadata.blog,
    description: dictionary.metadata.blogDescription,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: getLocaleAlternates("/blog"),
    },
    openGraph: {
      title: dictionary.metadata.blog,
      description: dictionary.metadata.blogDescription,
      url: `${siteConfig.url.replace(/\/$/, "")}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const posts = getAllPostsMeta(locale);
  const allTags = getAllTags(locale);

  return (
    <div className="page-shell max-w-4xl">
      <header className="page-hero mb-8 px-6 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">{dictionary.navigation.blog}</p>
        <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          {dictionary.blog.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {dictionary.blog.description}
        </p>
      </header>

      <Suspense fallback={<p className="text-muted-foreground">{dictionary.blog.loading}</p>}>
        <BlogListClient
          locale={locale}
          posts={posts}
          allTags={allTags}
          labels={{
            searchLabel: dictionary.blog.searchLabel,
            searchPlaceholder: dictionary.blog.searchPlaceholder,
            tags: dictionary.common.tags,
            all: dictionary.common.all,
            filteringByTag: dictionary.blog.filteringByTag,
            noMatches: dictionary.blog.noMatches,
          }}
        />
      </Suspense>
    </div>
  );
}
