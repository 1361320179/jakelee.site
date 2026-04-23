import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist_Mono, Manrope } from "next/font/google";
import "@/app/globals.css";
import Script from "next/script";
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

type Theme = "light" | "dark" | "system";

const themeInitScript = `
(() => {
  const storageKey = "theme";
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const savedTheme = localStorage.getItem(storageKey) || "system";
  const resolvedTheme = savedTheme === "system" ? systemTheme : savedTheme;

  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;
})();
`;

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
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      ],
    },
    title: {
      default: siteConfig.title,
      template: dictionary.metadata.titleTemplate,
    },
    description: dictionary.site.description,
    alternates: {
      types: {
        "application/rss+xml": `/${locale}/rss.xml`,
      },
    },
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
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const resolvedThemeClass =
    cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : "";
  const initialTheme = (
    cookieTheme === "light" ||
    cookieTheme === "dark" ||
    cookieTheme === "system"
      ? cookieTheme
      : "system"
  ) as Theme;

  return (
    <html
      lang={getLanguageTag(locale)}
      className={`${sans.variable} ${geistMono.variable} ${resolvedThemeClass} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={getSiteGraphJsonLd(locale, dictionary.site.description)} />
        <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
