import type { Metadata } from "next";
import { siteConfig } from "@/modules/site/configs/site";
import { getAllProjectsMeta } from "@/modules/project/server/projects";
import { ProjectCard } from "@/modules/project/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected work and experiments from ${siteConfig.name} - stack, tradeoffs, and links.`,
};

export const revalidate = 3600;

export default function ProjectsPage() {
  const projects = getAllProjectsMeta();

  return (
    <div className="page-shell">
      <header className="page-hero mb-8 max-w-4xl px-6 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Projects</p>
        <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Case-style write-ups with tech stack, constraints, and links. Swap summaries and MDX
          bodies as your portfolio grows.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="surface-panel rounded-[1.75rem] border-dashed px-4 py-12 text-center text-muted-foreground">
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
