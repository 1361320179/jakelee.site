import type { Metadata } from "next";
import { siteConfig } from "@/modules/site/configs/site";
import { ContactForm } from "@/modules/contact/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} - send a message, store it in Supabase, and notify by email.`,
};

export default function ContactPage() {
  return (
    <div className="page-shell max-w-4xl">
      <div className="page-hero px-6 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Contact</p>
        <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Share a short brief and the best email to reach you. Messages are stored through the
          contact API route and forwarded to my inbox.
        </p>
      </div>

      <div className="surface-panel mt-8 px-6 py-8 sm:px-8">
        <ContactForm />
      </div>
    </div>
  );
}
