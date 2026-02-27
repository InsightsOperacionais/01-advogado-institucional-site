type SendResendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
};

function normalizeRecipients(to: string | string[]) {
  return Array.isArray(to) ? to : [to];
}

export async function sendResendEmail({
  to,
  subject,
  html,
}: SendResendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    process.env.RESEND_TO_EMAIL ??
    "noreply@vonmarins.local";

  if (!apiKey) {
    console.warn("[mail] RESEND_API_KEY não configurada. Envio ignorado.");
    return { ok: false, skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: normalizeRecipients(to),
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`[mail] falha no envio (${response.status}): ${body}`);
    return { ok: false, skipped: false };
  }

  return { ok: true, skipped: false };
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
