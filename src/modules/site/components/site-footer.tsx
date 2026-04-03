import Link from "next/link";
import { siteConfig } from "@/modules/site/configs/site";
import { SubscribeForm } from "@/modules/newsletter/components/subscribe-form";

export function SiteFooter({
  labels,
}: {
  labels: {
    title: string;
    description: string;
    submit: string;
    success: string;
    error: string;
    emailLabel: string;
  };
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 px-3 pb-4 sm:px-5">
      <div className="page-shell space-y-4">
        <div className="surface-panel overflow-hidden rounded-[2rem]">
          <div className="grid gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">{labels.title}</p>
              <p className="mt-4 max-w-lg text-sm text-muted-foreground">
                {labels.description}
              </p>
            </div>
            <div className="relative">
              <SubscribeForm
                labels={{
                  submit: labels.submit,
                  success: labels.success,
                  error: labels.error,
                  emailLabel: labels.emailLabel,
                }}
              />
            </div>
          </div>

          <div className="border-t border-border/70 bg-muted/35 px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-heading text-xl font-semibold">{siteConfig.name}</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {labels.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <Link
                  href={siteConfig.links.github}
                  className="rounded-full border border-border/70 px-4 py-2 hover:bg-accent/70 hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Link>
                <Link
                  href={siteConfig.links.twitter}
                  className="rounded-full border border-border/70 px-4 py-2 hover:bg-accent/70 hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter / X
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 py-3 text-center text-xs text-muted-foreground">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
