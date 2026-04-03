import { env } from "@/lib/env";

export const siteConfig = {
  name: "Jake Lee",
  title: "Jake Lee",
  url: env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
} as const;
