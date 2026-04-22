import "server-only";

import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import {
  defaultLocale,
  isLocale,
  locales,
  type SiteLocale,
} from "@/i18n/config";

export async function requireLocale(locale: string) {
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function getLocaleDictionary(locale: string) {
  const resolvedLocale = await requireLocale(locale);

  return {
    locale: resolvedLocale,
    dictionary: await getDictionary(resolvedLocale),
  };
}

/** hreflang map for `alternates.languages` (includes `x-default`). */
export function getLocaleAlternates(pathname = "/") {
  const cleanPath = pathname === "/" ? "" : pathname;
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, `/${locale}${cleanPath}`]),
    ),
    "x-default": `/${defaultLocale}${cleanPath}`,
  } as Record<SiteLocale | "x-default", string>;
}
