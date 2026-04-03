"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { defaultLocale, getLocalizedPath, isLocale } from "@/i18n/config";

const labels = {
  en: {
    title: "Page not found",
    description: "The link may be broken or the page was removed.",
    backHome: "Back to home",
  },
  zh: {
    title: "页面不存在",
    description: "这个链接可能已失效，或者页面已经被移除。",
    backHome: "返回首页",
  },
} as const;

export default function NotFound() {
  const pathname = usePathname();
  const [, maybeLocale] = pathname.split("/");
  const locale = isLocale(maybeLocale) ? maybeLocale : defaultLocale;
  const copy = labels[locale];

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-1 flex-col items-center justify-center px-4 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{copy.description}</p>
        <Link
          href={getLocalizedPath(locale)}
          className={cn(buttonVariants({ size: "lg" }), "mt-10")}
        >
          {copy.backHome}
        </Link>
      </div>
    </main>
  );
}
