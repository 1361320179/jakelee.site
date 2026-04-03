import fs from "fs";
import path from "path";
import type { ReactNode } from "react";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { createMdxComponents } from "@/modules/blog/components/mdx-elements";
import { defaultLocale, type SiteLocale } from "@/i18n/config";
import { postFrontmatterSchema, type PostMeta } from "@/modules/blog/schemas/post";
import { extractTocFromMarkdown, type TocItem } from "@/modules/blog/utils/toc";

const POSTS_ROOT = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "src/content/posts",
);

function getPostsDir(locale: SiteLocale) {
  return path.join(POSTS_ROOT, locale);
}

function resolvePostsDir(locale: SiteLocale) {
  const localizedDir = getPostsDir(locale);
  if (fs.existsSync(localizedDir)) return localizedDir;
  const defaultDir = getPostsDir(defaultLocale);
  if (fs.existsSync(defaultDir)) return defaultDir;
  return POSTS_ROOT;
}

function listPostFilenames(locale: SiteLocale): string[] {
  const postsDir = resolvePostsDir(locale);
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

function parseMeta(
  slug: string,
  data: unknown,
  body: string,
): PostMeta | null {
  const parsed = postFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`Invalid frontmatter for ${slug}:`, parsed.error.flatten());
    return null;
  }

  const frontmatter = parsed.data;
  const isProd = process.env.NODE_ENV === "production";
  if (frontmatter.draft && isProd) return null;

  const read = readingTime(body);
  const readingMinutes = Math.max(1, Math.ceil(read.minutes));

  return {
    ...frontmatter,
    slug,
    readingMinutes,
  };
}

export const getAllPostsMeta = cache((locale: SiteLocale): PostMeta[] => {
  const metas: PostMeta[] = [];
  const postsDir = resolvePostsDir(locale);

  for (const file of listPostFilenames(locale)) {
    const slug = slugFromFilename(file);
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data, content } = matter(raw);
    const meta = parseMeta(slug, data, content);
    if (meta) metas.push(meta);
  }

  return metas.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
});

export function getAllTags(locale: SiteLocale): string[] {
  const set = new Set<string>();
  for (const p of getAllPostsMeta(locale)) {
    for (const t of p.tags) set.add(t);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getAllCategories(locale: SiteLocale): string[] {
  const set = new Set<string>();
  for (const p of getAllPostsMeta(locale)) {
    if (p.category) set.add(p.category);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export type CompiledPost = {
  meta: PostMeta;
  content: ReactNode;
  toc: TocItem[];
};

export const getPostBySlug = cache(
  async (locale: SiteLocale, slug: string): Promise<CompiledPost | null> => {
    const filePath = path.join(resolvePostsDir(locale), `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const meta = parseMeta(slug, data, content);
    if (!meta) return null;

    const toc = extractTocFromMarkdown(content);

    const { content: mdxContent } = await compileMDX({
      source: content,
      options: {
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: "github-dark",
                keepBackground: true,
              },
            ],
          ],
        },
      },
      components: createMdxComponents(),
    });

    return {
      meta,
      content: mdxContent,
      toc,
    };
  },
);

export function getRelatedPosts(
  locale: SiteLocale,
  slug: string,
  limit = 3,
): PostMeta[] {
  const current = getAllPostsMeta(locale).find((p) => p.slug === slug);
  if (!current) return [];

  const others = getAllPostsMeta(locale).filter((p) => p.slug !== slug);
  const scored = others.map((p) => {
    const shared = p.tags.filter((t) => current.tags.includes(t)).length;
    return { p, shared };
  });

  return scored
    .sort((a, b) => b.shared - a.shared || +new Date(b.p.date) - +new Date(a.p.date))
    .slice(0, limit)
    .map((s) => s.p);
}

export function getAdjacentPosts(locale: SiteLocale, slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const ordered = getAllPostsMeta(locale);
  const idx = ordered.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  return {
    prev: ordered[idx + 1] ?? null,
    next: ordered[idx - 1] ?? null,
  };
}
