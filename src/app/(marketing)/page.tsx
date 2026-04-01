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
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 md:pt-20">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Personal brand · Content · Platform
        </p>
        <h1 className="font-heading mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Build clarity, ship craft, grow a lasting presence.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
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
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          What you&apos;ll find here
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/80 shadow-sm">
            <CardHeader>
              <BookOpen className="size-8 text-primary" aria-hidden />
              <CardTitle>Writing</CardTitle>
              <CardDescription>
                Long-form posts, notes, and playbooks — optimized for reading and SEO.
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
          <Card className="border-border/80 shadow-sm">
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
          <Card className="border-border/80 shadow-sm sm:col-span-2 lg:col-span-1">
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

      <section className="border-t border-border/60 bg-muted/20 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-xl font-semibold">Next step</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Tell me what you&apos;re building — or subscribe once the newsletter goes live.
              </p>
            </div>
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
