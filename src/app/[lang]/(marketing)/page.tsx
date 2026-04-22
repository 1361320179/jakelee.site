import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, FolderKanban, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLocalizedPath } from "@/i18n/config";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import { siteConfig } from "@/modules/site/configs/site";

type HomePageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);
  const canonical = `/${locale}`;

  return {
    alternates: {
      canonical,
      languages: getLocaleAlternates("/"),
    },
    openGraph: {
      title: siteConfig.title,
      description: dictionary.site.description,
      url: `${siteConfig.url.replace(/\/$/, "")}${canonical}`,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  return (
    <div className="relative space-y-10 sm:space-y-12">
      <section className="page-shell">
        <div className="page-hero px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
            <div>
              <p className="eyebrow">{dictionary.home.eyebrow}</p>
              <h1 className="font-heading mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {dictionary.home.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {dictionary.site.description}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={getLocalizedPath(locale, "/contact")}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "inline-flex items-center gap-1.5",
                  )}
                >
                  {dictionary.home.primaryCta}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={getLocalizedPath(locale, "/blog")}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  {dictionary.home.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="surface-panel rounded-[1.75rem] bg-background/55 p-5">
              <div className="grid gap-4 text-sm text-muted-foreground">
                <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
                  <p className="font-heading text-base font-semibold text-foreground">
                    {dictionary.home.cardIntroTitle}
                  </p>
                  <p className="mt-2 leading-relaxed">
                    {dictionary.home.cardIntroBody}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em]">
                      {dictionary.home.writingLabel}
                    </p>
                    <p className="mt-2 font-heading text-2xl text-foreground">
                      {dictionary.navigation.blog}
                    </p>
                  </div>
                  <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em]">
                      {dictionary.home.workLabel}
                    </p>
                    <p className="mt-2 font-heading text-2xl text-foreground">
                      {dictionary.navigation.projects}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="mb-8">
          <h2 className="section-heading">{dictionary.home.whatTitle}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="h-full">
            <CardHeader>
              <BookOpen className="size-8 text-primary" aria-hidden />
              <CardTitle>{dictionary.home.writingTitle}</CardTitle>
              <CardDescription>{dictionary.home.writingBody}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={getLocalizedPath(locale, "/blog")}
                className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto px-0")}
              >
                {dictionary.home.writingCta}
              </Link>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <FolderKanban className="size-8 text-primary" aria-hidden />
              <CardTitle>{dictionary.home.projectsTitle}</CardTitle>
              <CardDescription>{dictionary.home.projectsBody}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={getLocalizedPath(locale, "/projects")}
                className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto px-0")}
              >
                {dictionary.home.projectsCta}
              </Link>
            </CardContent>
          </Card>
          <Card className="h-full sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <Mail className="size-8 text-primary" aria-hidden />
              <CardTitle>{dictionary.home.collaborationTitle}</CardTitle>
              <CardDescription>{dictionary.home.collaborationBody}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={getLocalizedPath(locale, "/contact")}
                className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto px-0")}
              >
                {dictionary.home.collaborationCta}
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="page-shell">
        <div className="surface-panel flex flex-col items-start justify-between gap-6 rounded-[2rem] px-6 py-8 sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 className="font-heading text-2xl font-semibold">
              {dictionary.home.nextStepTitle}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {dictionary.home.nextStepBody}
            </p>
          </div>
          <Link
            href={getLocalizedPath(locale, "/contact")}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            {dictionary.home.nextStepCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
