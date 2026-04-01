import { z } from "zod";

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["active", "archived", "experiment"]).optional(),
  draft: z.boolean().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export type ProjectMeta = ProjectFrontmatter & {
  slug: string;
};
