import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteConfig } from "@/modules/site/configs/site";
import { getAllPostsMeta } from "@/modules/blog/server/posts";
import { getAllProjectsMeta } from "@/modules/project/server/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${base}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${base}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${base}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPostsMeta(locale).map((post) => ({
      url: `${base}/${locale}/blog/${post.slug}`,
      lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllProjectsMeta(locale).map((project) => ({
      url: `${base}/${locale}/projects/${project.slug}`,
      lastModified: project.date ? new Date(project.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

  return [...staticPages, ...blogEntries, ...projectEntries];
}
