import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/config";
import { siteConfig } from "@/modules/site/configs/site";
import { getAllPostsMeta } from "@/modules/blog/server/posts";
import { getAllProjectsMeta } from "@/modules/project/server/projects";

function hreflangLanguages(
  origin: string,
  /** Path after locale, e.g. "" (home), "/about", "/blog/my-post". */
  suffixAfterLocale: string,
): Record<string, string> {
  const suffix = suffixAfterLocale.startsWith("/")
    ? suffixAfterLocale
    : suffixAfterLocale
      ? `/${suffixAfterLocale}`
      : "";
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${origin}/${loc}${suffix}`;
  }
  languages["x-default"] = `${origin}/${defaultLocale}${suffix}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${base}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: { languages: hreflangLanguages(base, "") },
    },
    {
      url: `${base}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: hreflangLanguages(base, "/about") },
    },
    {
      url: `${base}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: { languages: hreflangLanguages(base, "/blog") },
    },
    {
      url: `${base}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: { languages: hreflangLanguages(base, "/projects") },
    },
    {
      url: `${base}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: hreflangLanguages(base, "/contact") },
    },
  ]);

  const blogEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPostsMeta(locale).map((post) => {
      const suffix = `/blog/${post.slug}`;
      return {
        url: `${base}/${locale}/blog/${post.slug}`,
        lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: hreflangLanguages(base, suffix) },
      };
    }),
  );

  const projectEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllProjectsMeta(locale).map((project) => {
      const suffix = `/projects/${project.slug}`;
      return {
        url: `${base}/${locale}/projects/${project.slug}`,
        lastModified: project.date ? new Date(project.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.75,
        alternates: { languages: hreflangLanguages(base, suffix) },
      };
    }),
  );

  return [...staticPages, ...blogEntries, ...projectEntries];
}
