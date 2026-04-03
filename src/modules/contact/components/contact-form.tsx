"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  networkError: string;
};

export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setPending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setMessage({
          type: "err",
          text: data.error ?? `Request failed (${res.status})`,
        });
        return;
      }

      setMessage({ type: "ok", text: labels.success });
      form.reset();
    } catch {
      setMessage({ type: "err", text: labels.networkError });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{labels.name}</Label>
        <Input id="name" name="name" required autoComplete="name" maxLength={120} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{labels.email}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={320}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{labels.message}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={8000}
          placeholder={labels.messagePlaceholder}
        />
      </div>

      <Button type="submit" disabled={pending} className="px-5">
        {pending ? labels.submitting : labels.submit}
      </Button>

      {message ? (
        <p
          role="status"
          className={
            message.type === "ok"
              ? "text-sm text-green-600 dark:text-green-400"
              : "text-sm text-destructive"
          }
        >
          {message.text}
        </p>
      ) : null}
    </form>
  );
}
