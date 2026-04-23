import { getLocaleDictionary } from "@/i18n/server";
import { SiteFooter } from "@/modules/site/components/site-footer";
import { SiteHeader } from "@/modules/site/components/site-header";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function MarketingLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader
        locale={locale}
        labels={dictionary.navigation}
        languageLabels={{ en: "EN", zh: "中文" }}
      />
      <main className="flex-1 pb-4 pt-6 sm:pt-8">{children}</main>
      <SiteFooter
        locale={locale}
        labels={{
          title: dictionary.newsletter.title,
          description: dictionary.newsletter.description,
          submit: dictionary.newsletter.submit,
          success: dictionary.newsletter.success,
          error: dictionary.newsletter.error,
          emailLabel: dictionary.navigation.newsletterEmail,
          rssHint: dictionary.navigation.rssHint,
        }}
      />
    </div>
  );
}
