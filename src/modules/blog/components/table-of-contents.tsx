"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/modules/blog/utils/toc";

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }))
      .filter((x): x is { id: string; el: HTMLElement } => Boolean(x.el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const { el } of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "text-sm",
        "sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto py-1",
        className,
      )}
    >
      <p className="mb-3 font-heading font-semibold text-foreground">On this page</p>
      <ul className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "1rem" : "0.5rem" }}
            className={cn(
              "-ml-px border-l-2 border-transparent pl-3 transition-colors",
              activeId === item.id && "border-primary text-foreground",
              activeId !== item.id && "text-muted-foreground hover:text-foreground",
            )}
          >
            <a href={`#${item.id}`} className="block py-0.5 leading-snug">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
