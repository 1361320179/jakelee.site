import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/modules/site/components/theme-provider";
import { JsonLd } from "@/modules/seo/jsonld/json-ld";
import { getSiteGraphJsonLd } from "@/modules/seo/jsonld/site-graph";
import { siteConfig } from "@/modules/site/configs/site";
import { getLanguageTag, localeInfo, locales } from "@/i18n/config";
import { getLocaleDictionary } from "@/i18n/server";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: dictionary.metadata.titleTemplate,
    },
    description: dictionary.site.description,
    openGraph: {
      title: siteConfig.title,
      description: dictionary.site.description,
      url: `/${locale}`,
      siteName: siteConfig.name,
      locale: localeInfo[locale].ogLocale,
      type: "website",
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: dictionary.site.description,
      images: ["/api/og"],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  return (
    <html
      lang={getLanguageTag(locale)}
      className={`${sans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={getSiteGraphJsonLd(locale, dictionary.site.description)} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
