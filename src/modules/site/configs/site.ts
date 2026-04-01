import { env } from "@/lib/env";

export const siteConfig = {
  name: "Jake Lee",
  title: "Jake Lee",
  description:
    "Personal brand, engineering notes, and projects — a modular home for content and future product surface.",
  url: env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
} as const;
