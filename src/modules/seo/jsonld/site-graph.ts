import { siteConfig } from "@/modules/site/configs/site";

const base = siteConfig.url.replace(/\/$/, "");

export function getSiteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: base,
        inLanguage: siteConfig.locale,
        publisher: { "@id": `${base}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${base}/#person`,
        name: siteConfig.name,
        url: base,
        sameAs: [siteConfig.links.github, siteConfig.links.twitter],
      },
    ],
  };
}

export function getBlogPostingJsonLd(input: {
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
    author: { "@type": "Person", name: siteConfig.name, url: base },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: base,
    },
  };
}
