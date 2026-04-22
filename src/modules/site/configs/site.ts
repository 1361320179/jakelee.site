import { env } from "@/lib/env";

export const siteConfig = {
  name: "Jake Lee",
  title: "Jake Lee",
  url: env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  links: {
    github: env.NEXT_PUBLIC_SOCIAL_GITHUB_URL,
    twitter: env.NEXT_PUBLIC_SOCIAL_TWITTER_URL,
  },
};
