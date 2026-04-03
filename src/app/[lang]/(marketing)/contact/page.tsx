import type { Metadata } from "next";
import { ContactForm } from "@/modules/contact/components/contact-form";
import { getLocaleAlternates, getLocaleDictionary } from "@/i18n/server";
import { siteConfig } from "@/modules/site/configs/site";

type ContactPageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  return {
    title: dictionary.metadata.contact,
    description: dictionary.metadata.contactDescription,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: getLocaleAlternates("/contact"),
    },
    openGraph: {
      title: dictionary.metadata.contact,
      description: dictionary.metadata.contactDescription,
      url: `${siteConfig.url.replace(/\/$/, "")}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const { dictionary } = await getLocaleDictionary(lang);

  return (
    <div className="page-shell max-w-4xl">
      <div className="page-hero px-6 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">{dictionary.navigation.contact}</p>
        <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          {dictionary.contact.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {dictionary.contact.description}
        </p>
      </div>

      <div className="surface-panel mt-8 px-6 py-8 sm:px-8">
        <ContactForm labels={dictionary.contact} />
      </div>
    </div>
  );
}
