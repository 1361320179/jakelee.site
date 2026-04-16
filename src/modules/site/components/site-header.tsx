"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, ExternalLink, Menu, Sparkles } from "lucide-react";
import {
  getLocalizedPath,
  locales,
  stripLocaleFromPathname,
  type SiteLocale,
} from "@/i18n/config";
import { mainNav, siteNav } from "@/modules/site/configs/nav";
import { siteConfig } from "@/modules/site/configs/site";
import { ThemeToggle } from "@/modules/site/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
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
    site: string;
    game: string;
    siteMenuEyebrow: string;
    siteMenuDescription: string;
    siteMenuCaption: string;
    menu: string;
    switchToLight: string;
    switchToDark: string;
    languageSwitcher: string;
  };
  languageLabels: Record<SiteLocale, string>;
};

type MobileNavLabels = {
  home: string;
  blog: string;
  projects: string;
  about: string;
  contact: string;
  site: string;
};

type MobileNavSheetProps = {
  locale: SiteLocale;
  labels: SiteHeaderProps["labels"];
  navLabels: MobileNavLabels;
};

function MobileNavSheet({ locale, labels, navLabels }: MobileNavSheetProps) {
  const [siteLinksOpen, setSiteLinksOpen] = useState(false);

  return (
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
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-accent/25">
            <button
              type="button"
              onClick={() => setSiteLinksOpen((open) => !open)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent/55"
              aria-expanded={siteLinksOpen}
            >
              <span>{labels.site}</span>
              <ChevronRight
                className={cn(
                  "size-4 text-muted-foreground transition-transform duration-300",
                  siteLinksOpen && "rotate-90 text-foreground",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                siteLinksOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-70",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 border-t border-border/60 px-4 pt-3 pb-4">
                  <div className="rounded-2xl border border-border/50 bg-background/70 px-3.5 py-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground/90">
                      {labels.siteMenuEyebrow}
                    </p>
                    <p className="mt-1 text-sm text-foreground/90">
                      {labels.siteMenuDescription}
                    </p>
                  </div>
                  {siteNav.items.map((item) => (
                    <SheetClose
                      key={item.href}
                      nativeButton={false}
                      render={
                        <a
                          href={item.href}
                          className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/85 px-4 py-3 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-background"
                        >
                          <div>
                            <div className="flex items-center gap-2 font-medium text-foreground">
                              <span>{labels.game}</span>
                              <ExternalLink className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {labels.siteMenuCaption}
                            </p>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground" />
                        </a>
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

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
    site: labels.site,
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
            <NavigationMenu align="end" className="shrink-0">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/70 hover:text-foreground data-popup-open:bg-accent/85 data-popup-open:text-foreground data-open:bg-accent/85 data-open:text-foreground">
                    {navLabels.site}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="w-[23rem] overflow-hidden rounded-[1.6rem] border border-border/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] p-2 text-popover-foreground shadow-[0_22px_80px_rgba(15,23,42,0.14)] supports-[backdrop-filter]:bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(248,250,252,0.82))] supports-[backdrop-filter]:backdrop-blur-2xl dark:bg-[linear-gradient(145deg,rgba(17,24,39,0.95),rgba(15,23,42,0.9))]">
                      <div className="relative overflow-hidden rounded-[1.2rem] border border-white/40 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.16),transparent_38%),linear-gradient(160deg,rgba(255,255,255,0.92),rgba(255,255,255,0.68))] px-5 py-4 dark:border-white/8 dark:bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.2),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_38%),linear-gradient(160deg,rgba(30,41,59,0.92),rgba(15,23,42,0.82))]">
                        <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1.5">
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground/90">
                              {labels.siteMenuEyebrow}
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {labels.siteMenuDescription}
                            </p>
                          </div>
                          <div className="rounded-full border border-border/60 bg-background/75 p-2 shadow-sm dark:bg-background/30">
                            <Sparkles className="size-4 text-foreground/80" />
                          </div>
                        </div>
                      </div>

                      <ul className="mt-2">
                        {siteNav.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink
                              href={item.href}
                              closeOnClick
                              className="group flex items-center justify-between gap-4 rounded-[1.2rem] border border-transparent px-4 py-3.5 transition-all duration-300 hover:border-border/60 hover:bg-accent/65"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-foreground">
                                    {labels.game}
                                  </span>
                                  <ExternalLink className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {labels.siteMenuCaption}
                                </p>
                              </div>
                              <span className="rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground transition-all duration-300 group-hover:border-foreground/15 group-hover:bg-background group-hover:text-foreground dark:bg-background/30">
                                <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                              </span>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
            <MobileNavSheet
              key={pathname}
              locale={locale}
              labels={labels}
              navLabels={navLabels}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
