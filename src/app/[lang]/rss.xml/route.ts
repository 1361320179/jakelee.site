import { getLanguageTag } from "@/i18n/config";
import { siteConfig } from "@/modules/site/configs/site";
import { getAllPostsMeta } from "@/modules/blog/server/posts";
import { getLocaleDictionary } from "@/i18n/server";

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const { locale, dictionary } = await getLocaleDictionary(lang);

  const base = siteConfig.url.replace(/\/$/, "");
  const posts = getAllPostsMeta(locale).slice(0, 50);

  const items = posts
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${base}/${locale}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/${locale}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.description ? `<description>${escapeXml(p.description)}</description>` : ""}
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${base}/${locale}</link>
    <description>${escapeXml(dictionary.site.description)}</description>
    <language>${getLanguageTag(locale)}</language>
    <atom:link href="${base}/${locale}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}