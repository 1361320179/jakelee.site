"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/92 px-3 pt-1.5 pb-1.5 backdrop-blur-xl sm:px-5 sm:pt-2">
      <div className="page-shell">
        <div className="surface-panel flex h-16 items-center justify-between gap-4 rounded-full px-4 sm:px-5">
          <Link
            href="/"
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
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all",
                    active
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:bg-accent/70 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "md:hidden",
                )}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(100%,20rem)] border-border/70 bg-popover/96 backdrop-blur-xl"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile">
                  {mainNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-foreground hover:border-border/70 hover:bg-accent/70"
                    >
                      {item.label}
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
