"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getLocalizedPath, type SiteLocale } from "@/i18n/config";
import type { PostMeta } from "@/modules/blog/schemas/post";
import { PostCard } from "@/modules/blog/components/post-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BlogListClientProps = {
  locale: SiteLocale;
  posts: PostMeta[];
  allTags: string[];
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    tags: string;
    all: string;
    filteringByTag: string;
    noMatches: string;
  };
};

export function BlogListClient({
  locale,
  posts,
  allTags,
  labels,
}: BlogListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagFromUrl = searchParams.get("tag") ?? "";

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (tagFromUrl && !p.tags.includes(tagFromUrl)) return false;
      if (!q) return true;
      const blob = `${p.title} ${p.description ?? ""} ${p.tags.join(" ")}`.toLowerCase();
      return blob.includes(q);
    });
  }, [posts, query, tagFromUrl]);

  function setTag(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) params.set("tag", tag);
    else params.delete("tag");
    const qs = params.toString();
    const href = getLocalizedPath(locale, "/blog");
    router.push(qs ? `${href}?${qs}` : href, { scroll: false });
  }

  return (
    <div className="space-y-8">
      <div className="surface-panel flex flex-col gap-4 rounded-[1.75rem] p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
        <div className="max-w-md flex-1">
          <label htmlFor="blog-search" className="sr-only">
            {labels.searchLabel}
          </label>
          <Input
            id="blog-search"
            type="search"
            placeholder={labels.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {allTags.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">{labels.tags}:</span>
          <button
            type="button"
            onClick={() => setTag(null)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
              !tagFromUrl
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border hover:bg-accent",
            )}
          >
            {labels.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setTag(tag === tagFromUrl ? null : tag)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                tagFromUrl === tag
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border hover:bg-accent",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      {tagFromUrl ? (
        <p className="text-sm text-muted-foreground">
          {labels.filteringByTag}{" "}
          <Badge variant="secondary" className="font-normal">
            {tagFromUrl}
          </Badge>
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <p className="surface-panel rounded-[1.75rem] border-dashed px-4 py-12 text-center text-muted-foreground">
          {labels.noMatches}
        </p>
      ) : (
        <ul className="space-y-6">
          {filtered.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
