import { z } from "zod";

export const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string(),
  updated: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  draft: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};
