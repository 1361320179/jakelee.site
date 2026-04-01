import type { Metadata } from "next";
import { siteConfig } from "@/modules/site/configs/site";
import { ContactForm } from "@/modules/contact/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} — send a message; stored via Drizzle when DATABASE_URL is set.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Share a short brief and the best email to reach you. Messages are written to your
        Postgres database through the contact API route.
      </p>
      <ContactForm />
    </div>
  );
}
