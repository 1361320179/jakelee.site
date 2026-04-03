"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SubscribeFormLabels = {
  submit: string;
  success: string;
  error: string;
  emailLabel: string;
};

export function SubscribeForm({ labels }: { labels: SubscribeFormLabels }) {
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
          aria-label={labels.emailLabel}
          className="flex-1"
        />
        <Button type="submit" disabled={pending} className="shrink-0 sm:px-5">
          {pending ? "..." : labels.submit}
        </Button>
      </form>
      {status === "ok" ? (
        <span className="text-xs text-muted-foreground">{labels.success}</span>
      ) : null}
      {status === "err" ? (
        <span className="text-xs text-destructive">{labels.error}</span>
      ) : null}
    </div>
  );
}
