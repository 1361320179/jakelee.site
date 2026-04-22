import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getLocalizedPath, locales } from "@/i18n/config";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import { getAllProjectsMeta, getProjectBySlug } from "@/modules/project/server/projects";
import { siteConfig } from "@/modules/site/configs/site";

type ProjectDetailPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllProjectsMeta(lang).map((project) => ({ lang, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const project = await getProjectBySlug(locale, slug);
  if (!project) return { title: dictionary.metadata.notFound };

  const { meta } = project;
  const canonical = `/${locale}/projects/${meta.slug}`;
  const ogImage = `/api/og?title=${encodeURIComponent(meta.title)}&subtitle=${encodeURIComponent(meta.summary)}`;

  return {
    title: meta.title,
    description: meta.summary,
    alternates: {
      canonical,
      languages: getLocaleAlternates(`/projects/${meta.slug}`),
    },
    openGraph: {
      title: meta.title,
      description: meta.summary,
      url: `${siteConfig.url.replace(/\/$/, "")}${canonical}`,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { lang, slug } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const project = await getProjectBySlug(locale, slug);
  if (!project) notFound();

  const { meta, content } = project;

  return (
    <article className="page-shell max-w-4xl">
      <header className="page-hero mb-10 px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-wrap gap-2">
          {meta.featured ? <Badge>{dictionary.common.featured}</Badge> : null}
          {meta.status ? (
            <Badge variant="secondary" className="capitalize">
              {meta.status}
            </Badge>
          ) : null}
        </div>
        <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
          {meta.summary}
        </p>

        {meta.techStack.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {meta.demoUrl ? (
            <a
              href={meta.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "default" }),
                "inline-flex items-center gap-2",
              )}
            >
              {dictionary.projects.viewDemo}
              <ExternalLink className="size-4" />
            </a>
          ) : null}
          {meta.repoUrl ? (
            <a
              href={meta.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "inline-flex items-center gap-2",
              )}
            >
              <GitBranch className="size-4" />
              {dictionary.projects.repository}
            </a>
          ) : null}
          <Link
            href={getLocalizedPath(locale, "/projects")}
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            {dictionary.common.viewAllProjects}
          </Link>
        </div>
      </header>

      <div
        className={[
          "surface-panel prose prose-neutral max-w-none rounded-[2rem] px-6 py-8 dark:prose-invert sm:px-8",
          "prose-headings:font-heading prose-headings:scroll-mt-24",
          "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
          "prose-pre:bg-transparent prose-pre:p-0",
          "prose-code:before:content-none prose-code:after:content-none",
        ].join(" ")}
      >
        {content}
      </div>

      <Separator className="my-12" />

      <p className="text-sm text-muted-foreground">
        <Link
          href={getLocalizedPath(locale, "/projects")}
          className="text-primary underline-offset-4 hover:underline"
        >
          {dictionary.common.backToProjects}
        </Link>
      </p>
    </article>
  );
}
