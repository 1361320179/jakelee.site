import type { Metadata } from "next";
import { siteConfig } from "@/modules/site/configs/site";
import { getAllProjectsMeta } from "@/modules/project/server/projects";
import { ProjectCard } from "@/modules/project/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected work and experiments from ${siteConfig.name} — stack, tradeoffs, and links.`,
};

export const revalidate = 3600;

export default function ProjectsPage() {
  const projects = getAllProjectsMeta();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Projects</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Case-style write-ups with tech stack, constraints, and links. Swap summaries and MDX
          bodies as your portfolio grows.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-4 py-12 text-center text-muted-foreground">
          No projects published yet.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
