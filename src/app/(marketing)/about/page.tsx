import type { Metadata } from "next";
import { siteConfig } from "@/modules/site/configs/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — background, focus areas, and how we can work together.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-4xl font-bold tracking-tight">About</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This page is your branded story: who you are, what you optimize for, and how you
        work with others. Replace this copy with your voice.
      </p>
      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="font-heading text-xl font-semibold">Focus</h2>
          <p className="text-muted-foreground leading-relaxed">
            Frontend architecture, performance, and product-minded engineering — with room
            to grow into courses, templates, and advisory as your IP matures.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-semibold">How I work</h2>
          <p className="text-muted-foreground leading-relaxed">
            Short iterations, explicit tradeoffs, and documentation that survives handoff.
            Detail your rituals and tools here when you are ready.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl font-semibold">Let&apos;s talk</h2>
          <p className="text-muted-foreground leading-relaxed">
            Use the contact form for inquiries, collaborations, or speaking — the site is
            built to add booking and downloads without a rewrite.
          </p>
        </section>
      </div>
    </div>
  );
}
