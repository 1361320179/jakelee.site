import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink, GitBranch } from "lucide-react";
import { siteConfig } from "@/modules/site/configs/site";
import { getAllProjectsMeta, getProjectBySlug } from "@/modules/project/server/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjectsMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not found" };

  const { meta } = project;
  const description = meta.summary;

  return {
    title: meta.title,
    description,
    openGraph: {
      title: meta.title,
      description,
      url: `${siteConfig.url}/projects/${meta.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description,
    },
  };
}

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { meta, content } = project;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10">
        <div className="flex flex-wrap gap-2">
          {meta.featured ? <Badge>Featured</Badge> : null}
          {meta.status ? (
            <Badge variant="secondary" className="capitalize">
              {meta.status}
            </Badge>
          ) : null}
        </div>
        <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {meta.title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground leading-relaxed">{meta.summary}</p>

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
              View demo
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
              Repository
            </a>
          ) : null}
          <Link href="/projects" className={cn(buttonVariants({ variant: "ghost" }))}>
            All projects
          </Link>
        </div>
      </header>

      <div
        className={[
          "prose prose-neutral max-w-none dark:prose-invert",
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
        <Link href="/projects" className="text-primary underline-offset-4 hover:underline">
          ← Back to projects
        </Link>
      </p>
    </article>
  );
}
