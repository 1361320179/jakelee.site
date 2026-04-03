import Link from "next/link";
import { ExternalLink, GitBranch } from "lucide-react";
import { getLocalizedPath, type SiteLocale } from "@/i18n/config";
import type { ProjectMeta } from "@/modules/project/schemas/project";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  locale: SiteLocale;
  project: ProjectMeta;
  labels: {
    featured: string;
    caseStudy: string;
    liveDemo: string;
    source: string;
  };
};

export function ProjectCard({ locale, project, labels }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          {project.featured ? (
            <Badge variant="default" className="font-normal">
              {labels.featured}
            </Badge>
          ) : null}
          {project.status ? (
            <Badge variant="secondary" className="font-normal capitalize">
              {project.status}
            </Badge>
          ) : null}
        </div>
        <CardTitle className="font-heading text-xl leading-snug sm:text-2xl">
          <Link
            href={getLocalizedPath(locale, `/projects/${project.slug}`)}
            className="hover:underline"
          >
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {project.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex flex-1 flex-col gap-5">
        {project.techStack.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Link
            href={getLocalizedPath(locale, `/projects/${project.slug}`)}
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            {labels.caseStudy}
          </Link>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "inline-flex items-center gap-1",
              )}
            >
              {labels.liveDemo}
              <ExternalLink className="size-3.5" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "inline-flex items-center gap-1",
              )}
            >
              <GitBranch className="size-3.5" />
              {labels.source}
            </a>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
