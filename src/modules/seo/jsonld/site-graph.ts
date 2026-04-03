import { getLanguageTag, type SiteLocale } from "@/i18n/config";
import { siteConfig } from "@/modules/site/configs/site";

const base = siteConfig.url.replace(/\/$/, "");

export function getSiteGraphJsonLd(
  locale: SiteLocale,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: siteConfig.name,
        description,
        url: `${base}/${locale}`,
        inLanguage: getLanguageTag(locale),
        publisher: { "@id": `${base}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: siteConfig.name,
        url: `${base}/${locale}`,
        sameAs: [siteConfig.links.github, siteConfig.links.twitter],
      },
    ],
  };
}

export function getBlogPostingJsonLd(input: {
  locale: SiteLocale;
  title: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    url: input.url,
    mainEntityOfPage: input.url,
    inLanguage: getLanguageTag(input.locale),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: `${base}/${input.locale}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: `${base}/${input.locale}`,
    },
  };
}
