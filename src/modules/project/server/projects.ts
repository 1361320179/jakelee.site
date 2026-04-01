import fs from "fs";
import path from "path";
import type { ReactNode } from "react";
import { cache } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { createMdxComponents } from "@/modules/blog/components/mdx-elements";
import {
  projectFrontmatterSchema,
  type ProjectMeta,
} from "@/modules/project/schemas/project";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

function listProjectFilenames(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

function parseMeta(slug: string, data: unknown): ProjectMeta | null {
  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(`Invalid project frontmatter for ${slug}:`, parsed.error.flatten());
    return null;
  }
  const frontmatter = parsed.data;
  const isProd = process.env.NODE_ENV === "production";
  if (frontmatter.draft && isProd) return null;
  return { ...frontmatter, slug };
}

export const getAllProjectsMeta = cache((): ProjectMeta[] => {
  const metas: ProjectMeta[] = [];
  for (const file of listProjectFilenames()) {
    const slug = slugFromFilename(file);
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const { data } = matter(raw);
    const meta = parseMeta(slug, data);
    if (meta) metas.push(meta);
  }
  return metas.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
});

export type CompiledProject = {
  meta: ProjectMeta;
  content: ReactNode;
};

export const getProjectBySlug = cache(
  async (slug: string): Promise<CompiledProject | null> => {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const meta = parseMeta(slug, data);
    if (!meta) return null;

    const { content: mdxContent } = await compileMDX({
      source: content,
      options: {
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              { theme: "github-dark", keepBackground: true },
            ],
          ],
        },
      },
      components: createMdxComponents(),
    });

    return { meta, content: mdxContent };
  },
);
