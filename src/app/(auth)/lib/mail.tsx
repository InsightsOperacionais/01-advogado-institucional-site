import { confirmEmailTemplate } from "../_components/email/confirm-email";
import { passwordResetTemplate } from "../_components/email/password-reset-email";
import { twoFactorTemplate } from "../_components/email/two-factor";

type MailResult = {
  ok: boolean;
  skipped: boolean;
};

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const resendApiUrl = "https://api.resend.com/emails";

async function sendMail(
  to: string,
  subject: string,
  html: string,
): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    process.env.RESEND_TO_EMAIL ??
    "noreply@vonmarins.local";

  if (!apiKey || !from) {
    console.warn("[auth:mail] envio ignorado: RESEND_API_KEY/RESEND_FROM_EMAIL ausentes.");
    return { ok: false, skipped: true };
  }

  try {
    const response = await fetch(resendApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`[auth:mail] falha no envio (${response.status}): ${body}`);
      return { ok: false, skipped: false };
    }

    return { ok: true, skipped: false };
  } catch (error) {
    console.error("[auth:mail] erro inesperado ao enviar e-mail:", error);
    return { ok: false, skipped: false };
  }
}

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  return sendMail(
    email,
    "Código de autenticação - Von Marins",
    twoFactorTemplate(token),
  );
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${appUrl}/new-password?token=${token}`;
  return sendMail(
    email,
    "Redefinição de senha - Von Marins",
    passwordResetTemplate(resetLink),
  );
}

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${appUrl}/new-verification?token=${token}`;
  return sendMail(
    email,
    "Confirmação de e-mail - Von Marins",
    confirmEmailTemplate(confirmLink),
  );
}
