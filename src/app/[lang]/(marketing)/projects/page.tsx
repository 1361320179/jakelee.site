import type { Metadata } from "next";
import { ProjectCard } from "@/modules/project/components/project-card";
import { getAllProjectsMeta } from "@/modules/project/server/projects";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import { siteConfig } from "@/modules/site/configs/site";

type ProjectsPageProps = {
  params: Promise<{ lang: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  return {
    title: dictionary.metadata.projects,
    description: dictionary.metadata.projectsDescription,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: getLocaleAlternates("/projects"),
    },
    openGraph: {
      title: dictionary.metadata.projects,
      description: dictionary.metadata.projectsDescription,
      url: `${siteConfig.url.replace(/\/$/, "")}/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const projects = getAllProjectsMeta(locale);

  return (
    <div className="page-shell">
      <header className="page-hero mb-8 max-w-4xl px-6 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">{dictionary.navigation.projects}</p>
        <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          {dictionary.projects.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {dictionary.projects.description}
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="surface-panel rounded-[1.75rem] border-dashed px-4 py-12 text-center text-muted-foreground">
          {dictionary.projects.empty}
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard
                locale={locale}
                project={project}
                labels={{
                  featured: dictionary.common.featured,
                  caseStudy: dictionary.projects.caseStudy,
                  liveDemo: dictionary.projects.liveDemo,
                  source: dictionary.projects.source,
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
