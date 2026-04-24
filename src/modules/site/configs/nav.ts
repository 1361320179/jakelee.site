export const mainNav = [
  { key: "home", href: "/" },
  { key: "blog", href: "/blog" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const siteNav = {
  key: "site",
  items: [
    {
      key: "game",
      href: "https://game.jakelee.site",
    },
    {
      key: "tool",
      href: "https://tool.jakelee.site",
    },
  ],
} as const;
