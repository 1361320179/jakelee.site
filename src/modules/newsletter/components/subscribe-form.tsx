"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SubscribeForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setStatus("err");
        return;
      }

      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email for newsletter"
          className="flex-1"
        />
        <Button type="submit" disabled={pending} className="shrink-0 sm:px-5">
          {pending ? "…" : "Subscribe"}
        </Button>
      </form>
      {status === "ok" ? (
        <span className="text-xs text-muted-foreground">You&apos;re on the list.</span>
      ) : null}
      {status === "err" ? (
        <span className="text-xs text-destructive">
          Could not subscribe. Check DATABASE_URL or try later.
        </span>
      ) : null}
    </div>
  );
}
