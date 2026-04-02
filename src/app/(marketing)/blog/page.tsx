import { Suspense } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/modules/site/configs/site";
import { getAllPostsMeta, getAllTags } from "@/modules/blog/server/posts";
import { BlogListClient } from "@/modules/blog/components/blog-list-client";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles and notes from ${siteConfig.name} - engineering, performance, and product craft.`,
};

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const allTags = getAllTags();

  return (
    <div className="page-shell max-w-4xl">
      <header className="page-hero mb-8 px-6 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Blog</p>
        <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Long-form writing, technical notes, and playbooks - searchable by keyword or tag.
        </p>
      </header>

      <Suspense fallback={<p className="text-muted-foreground">Loading posts...</p>}>
        <BlogListClient posts={posts} allTags={allTags} />
      </Suspense>
    </div>
  );
}
