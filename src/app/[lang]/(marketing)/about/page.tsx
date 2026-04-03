import type { Metadata } from "next";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import { siteConfig } from "@/modules/site/configs/site";

type AboutPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  return {
    title: dictionary.metadata.about,
    description: dictionary.metadata.aboutDescription,
    alternates: {
      canonical: `/${locale}/about`,
      languages: getLocaleAlternates("/about"),
    },
    openGraph: {
      title: dictionary.metadata.about,
      description: dictionary.metadata.aboutDescription,
      url: `${siteConfig.url.replace(/\/$/, "")}/${locale}/about`,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const { dictionary } = await getLocaleDictionary(lang);

  return (
    <div className="page-shell">
      <div className="page-hero max-w-4xl px-6 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">{dictionary.navigation.about}</p>
        <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          {dictionary.about.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {dictionary.about.description}
        </p>
      </div>

      <div className="surface-panel mx-auto mt-8 max-w-4xl px-6 py-8 sm:px-8">
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="font-heading text-xl font-semibold">
              {dictionary.about.focusTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {dictionary.about.focusBody}
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-semibold">
              {dictionary.about.workTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {dictionary.about.workBody}
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-semibold">
              {dictionary.about.talkTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {dictionary.about.talkBody}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
