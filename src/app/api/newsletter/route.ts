import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/app/(auth)/lib/rate-limit";
import { escapeHtml, sendResendEmail } from "@/lib/resend-mail";
import { siteConfig } from "@/lib/site-config";

const newsletterSchema = z.object({
  email: z.string().email().max(200),
  website: z.string().optional(), // honeypot
});

function getRequestIP(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = newsletterSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "E-mail inválido para assinatura." },
        { status: 400 },
      );
    }

    const { email, website } = parsed.data;

    if (website?.trim()) {
      return NextResponse.json(
        { error: "Solicitação inválida." },
        { status: 400 },
      );
    }

    const ip = getRequestIP(request);
    const limit = await rateLimit(`newsletter:${ip}:${email.toLowerCase()}`, {
      maxRequests: 5,
      windowMs: 10 * 60_000,
    });

    if (!limit.success) {
      return NextResponse.json(
        {
          error:
            "Muitas tentativas de assinatura. Aguarde alguns minutos para tentar novamente.",
        },
        { status: 429 },
      );
    }

    const destination = process.env.CONTACT_DESTINATION_EMAIL ?? siteConfig.contactEmail;
    const html = `
      <h2>Nova assinatura da newsletter</h2>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    `;

    const sent = await sendResendEmail({
      to: destination,
      subject: `Nova assinatura newsletter - ${siteConfig.shortName}`,
      html,
    });

    if (!sent.ok && !sent.skipped) {
      return NextResponse.json(
        { error: "Não foi possível concluir a assinatura agora." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: "Assinatura confirmada. Você receberá os próximos insights.",
    });
  } catch (error) {
    console.error("[api/newsletter] erro inesperado", error);
    return NextResponse.json(
      { error: "Erro interno ao processar assinatura." },
      { status: 500 },
    );
  }
}
