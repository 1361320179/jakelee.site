import { Suspense } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/modules/site/configs/site";
import { getAllPostsMeta, getAllTags } from "@/modules/blog/server/posts";
import { BlogListClient } from "@/modules/blog/components/blog-list-client";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles and notes from ${siteConfig.name} — engineering, performance, and product craft.`,
};

export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const allTags = getAllTags();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Long-form writing, technical notes, and playbooks — searchable by keyword or tag.
        </p>
      </header>

      <Suspense fallback={<p className="text-muted-foreground">Loading posts…</p>}>
        <BlogListClient posts={posts} allTags={allTags} />
      </Suspense>
    </div>
  );
}
