"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  getLocalizedPath,
  locales,
  stripLocaleFromPathname,
  type SiteLocale,
} from "@/i18n/config";
import { mainNav } from "@/modules/site/configs/nav";
import { siteConfig } from "@/modules/site/configs/site";
import { ThemeToggle } from "@/modules/site/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: SiteLocale;
  labels: {
    home: string;
    blog: string;
    projects: string;
    about: string;
    contact: string;
    menu: string;
    switchToLight: string;
    switchToDark: string;
    languageSwitcher: string;
  };
  languageLabels: Record<SiteLocale, string>;
};

export function SiteHeader({
  locale,
  labels,
  languageLabels,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const pathnameWithoutLocale = stripLocaleFromPathname(pathname);
  const navLabels = {
    home: labels.home,
    blog: labels.blog,
    projects: labels.projects,
    about: labels.about,
    contact: labels.contact,
  } as const;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/92 px-3 pt-1.5 pb-1.5 backdrop-blur-xl sm:px-5 sm:pt-2">
      <div className="page-shell">
        <div className="surface-panel flex h-16 items-center justify-between gap-4 rounded-full px-4 sm:px-5">
          <Link
            href={getLocalizedPath(locale)}
            className="font-heading text-lg font-semibold tracking-tight text-foreground"
          >
            {siteConfig.name}
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-border/70 bg-background/60 p-1 md:flex"
            aria-label="Main"
          >
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathnameWithoutLocale === "/"
                  : pathnameWithoutLocale.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={getLocalizedPath(locale, item.href)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    active
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                  )}
                >
                  {navLabels[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1 rounded-full border border-border/70 bg-background/60 p-1 md:hidden"
              aria-label={labels.languageSwitcher}
            >
              {locales.map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={getLocalizedPath(targetLocale, pathnameWithoutLocale)}
                  className={cn(
                    "rounded-full px-2.5 py-2 text-[11px] font-semibold transition-colors",
                    targetLocale === locale
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                  )}
                >
                  {languageLabels[targetLocale]}
                </Link>
              ))}
            </div>
            <div
              className="hidden items-center gap-1 rounded-full border border-border/70 bg-background/60 p-1 md:flex"
              aria-label={labels.languageSwitcher}
            >
              {locales.map((targetLocale) => (
                <Link
                  key={targetLocale}
                  href={getLocalizedPath(targetLocale, pathnameWithoutLocale)}
                  className={cn(
                    "rounded-full px-3 py-2 text-xs font-semibold transition-colors",
                    targetLocale === locale
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                  )}
                >
                  {languageLabels[targetLocale]}
                </Link>
              ))}
            </div>
            <ThemeToggle
              labels={{
                switchToLight: labels.switchToLight,
                switchToDark: labels.switchToDark,
              }}
            />
            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "md:hidden",
                )}
                aria-label={labels.menu}
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(100%,20rem)] border-border/70 bg-popover/96 backdrop-blur-xl"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">{labels.menu}</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile">
                  {mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={getLocalizedPath(locale, item.href)}
                      className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-foreground hover:border-border/70 hover:bg-accent/70"
                    >
                      {navLabels[item.key]}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
