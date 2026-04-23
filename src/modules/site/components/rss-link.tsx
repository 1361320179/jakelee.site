"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function RssLink({ href, hint }: { href: string; hint: string }) {
  const [origin, setOrigin] = useState("");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fullUrl = `${origin}${href}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        onClick={toggleOpen}
        className={cn(
          "rounded-full border px-4 py-2 hover:bg-accent/70 hover:text-foreground transition-colors",
          open ? "bg-accent/70 text-foreground border-border/70" : "border-border/70"
        )}
      >
        RSS
      </button>

      {open && (
        <div className="fixed bottom-4 left-4 right-4 z-50 sm:absolute sm:bottom-full sm:left-auto sm:right-0 sm:mb-2 sm:w-72 rounded-2xl border border-border/60 bg-popover p-4 text-popover-foreground shadow-lg transition-all duration-200">
          <p className="text-sm font-medium mb-3">{hint.replace("\\n\\n", "")}</p>
          <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/50 p-1.5">
            <div className="flex-1 truncate px-2 text-xs text-muted-foreground select-all">
              {fullUrl}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center rounded-md p-1.5 hover:bg-background/80 hover:text-foreground transition-colors shrink-0"
              title="Copy to clipboard"
            >
              {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}