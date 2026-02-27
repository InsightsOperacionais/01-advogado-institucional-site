import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/app/(auth)/lib/rate-limit";
import { escapeHtml, sendResendEmail } from "@/lib/resend-mail";
import { siteConfig } from "@/lib/site-config";

const contactSchema = z.object({
  name: z.string().min(3).max(120),
  email: z.string().email().max(200),
  practiceArea: z.string().min(3).max(120),
  message: z.string().min(20).max(3000),
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
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos no formulário de contato." },
        { status: 400 },
      );
    }

    const { name, email, practiceArea, message, website } = parsed.data;

    if (website?.trim()) {
      return NextResponse.json(
        { error: "Solicitação inválida." },
        { status: 400 },
      );
    }

    const ip = getRequestIP(request);
    const limit = await rateLimit(`contact:${ip}:${email.toLowerCase()}`, {
      maxRequests: 4,
      windowMs: 10 * 60_000,
    });

    if (!limit.success) {
      return NextResponse.json(
        {
          error:
            "Limite de tentativas atingido. Aguarde alguns minutos para tentar novamente.",
        },
        { status: 429 },
      );
    }

    const html = `
      <h2>Novo contato institucional</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Área:</strong> ${escapeHtml(practiceArea)}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    `;

    const destination = process.env.CONTACT_DESTINATION_EMAIL ?? siteConfig.contactEmail;
    const sent = await sendResendEmail({
      to: destination,
      subject: `Novo contato - ${siteConfig.shortName}`,
      html,
    });

    if (!sent.ok && !sent.skipped) {
      return NextResponse.json(
        { error: "Não foi possível enviar sua solicitação agora." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success:
        "Solicitação enviada com sucesso. Nossa equipe retornará o contato em breve.",
    });
  } catch (error) {
    console.error("[api/contact] erro inesperado", error);
    return NextResponse.json(
      { error: "Erro interno ao processar o contato." },
      { status: 500 },
    );
  }
}
