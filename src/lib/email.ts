import { env } from "@/lib/env";

type ContactNotificationInput = {
  email: string;
  message: string;
  name: string;
};

type SubscribeNotificationInput = {
  email: string;
};

type ResendSendPayload = {
  from: string;
  html: string;
  subject: string;
  to: string[];
  reply_to?: string;
};

function getNotificationConfig() {
  const apiKey = env.RESEND_API_KEY;
  const to = env.EMAIL_TO;
  const from = env.EMAIL_FROM;

  if (!apiKey || !to || !from) return null;

  return { apiKey, from, to };
}

async function sendEmail(payload: ResendSendPayload) {
  const config = getNotificationConfig();
  if (!config) {
    throw new Error(
      "Email client is not configured. Set RESEND_API_KEY, EMAIL_TO, and EMAIL_FROM.",
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`Resend send failed (${res.status}): ${errorText || "unknown error"}`);
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function wrapEmailHtml(title: string, rows: Array<[label: string, value: string]>) {
  const items = rows
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong><br />${escapeHtml(value).replaceAll("\n", "<br />")}</p>`,
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827"><h2>${escapeHtml(title)}</h2>${items}</div>`;
}

export function isEmailNotificationConfigured() {
  return Boolean(getNotificationConfig());
}

export async function sendSubscribeNotification({ email }: SubscribeNotificationInput) {
  const config = getNotificationConfig();
  if (!config) return;

  await sendEmail({
    from: config.from,
    to: [config.to],
    subject: `New newsletter subscriber: ${email}`,
    reply_to: email,
    html: wrapEmailHtml("New newsletter subscriber", [
      ["Email", email],
      ["Submitted at", new Date().toISOString()],
      ["Source", "Website newsletter form"],
    ]),
  });
}

export async function sendContactNotification({
  email,
  message,
  name,
}: ContactNotificationInput) {
  const config = getNotificationConfig();
  if (!config) return;

  await sendEmail({
    from: config.from,
    to: [config.to],
    subject: `New contact message from ${name}`,
    reply_to: email,
    html: wrapEmailHtml("New contact message", [
      ["Name", name],
      ["Email", email],
      ["Submitted at", new Date().toISOString()],
      ["Message", message],
    ]),
  });
}
