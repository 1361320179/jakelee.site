import Link from "next/link";
import { siteConfig } from "@/modules/site/configs/site";
import { SubscribeForm } from "@/modules/newsletter/components/subscribe-form";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="rounded-xl border border-border/60 bg-background/50 p-4 sm:p-6">
          <p className="font-heading text-sm font-semibold">Newsletter</p>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground">
            Occasional updates on posts and projects. No spam — unsubscribe anytime once
            email is wired.
          </p>
          <div className="relative mt-4">
            <SubscribeForm />
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-heading text-sm font-semibold">{siteConfig.name}</p>
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link
            href={siteConfig.links.github}
            className="hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.links.twitter}
            className="hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            Twitter / X
          </Link>
        </div>
        </div>
      </div>
      <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
