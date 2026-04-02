import Link from "next/link";
import { ArrowRight, BookOpen, FolderKanban, Mail } from "lucide-react";
import { siteConfig } from "@/modules/site/configs/site";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="relative space-y-10 sm:space-y-12">
      <section className="page-shell">
        <div className="page-hero px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
            <div>
              <p className="eyebrow">Personal brand / Content / Platform</p>
              <h1 className="font-heading mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Build clarity, ship craft, grow a lasting presence.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {siteConfig.description}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "inline-flex items-center gap-1.5",
                  )}
                >
                  Get in touch
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/blog"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  Read the blog
                </Link>
              </div>
            </div>

            <div className="surface-panel rounded-[1.75rem] bg-background/55 p-5">
              <div className="grid gap-4 text-sm text-muted-foreground">
                <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
                  <p className="font-heading text-base font-semibold text-foreground">
                    {siteConfig.name}
                  </p>
                  <p className="mt-2 leading-relaxed">
                    Personal site, writing hub, and project archive.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em]">Writing</p>
                    <p className="mt-2 font-heading text-2xl text-foreground">Blog</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-border/70 bg-background/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em]">Work</p>
                    <p className="mt-2 font-heading text-2xl text-foreground">Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="mb-8">
          <h2 className="section-heading">What you&apos;ll find here</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="h-full">
            <CardHeader>
              <BookOpen className="size-8 text-primary" aria-hidden />
              <CardTitle>Writing</CardTitle>
              <CardDescription>
                Long-form posts, notes, and playbooks - optimized for reading and SEO.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto px-0")}
              >
                Browse blog
              </Link>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <FolderKanban className="size-8 text-primary" aria-hidden />
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Case-style breakdowns with stack, tradeoffs, and links to live demos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/projects"
                className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto px-0")}
              >
                View work
              </Link>
            </CardContent>
          </Card>
          <Card className="h-full sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <Mail className="size-8 text-primary" aria-hidden />
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>
                Contact and newsletter hooks are wired for conversions as you scale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "link", size: "sm" }), "h-auto px-0")}
              >
                Contact
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="page-shell">
        <div className="surface-panel flex flex-col items-start justify-between gap-6 rounded-[2rem] px-6 py-8 sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 className="font-heading text-2xl font-semibold">Next step</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Tell me what you&apos;re building - or subscribe once the newsletter goes live.
            </p>
          </div>
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
