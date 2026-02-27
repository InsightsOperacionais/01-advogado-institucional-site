function baseTemplate(title: string, description: string, ctaLabel: string, ctaUrl: string) {
  return `
  <!doctype html>
  <html lang="pt-BR">
    <body style="margin:0;padding:24px;background:#f1f1f1;font-family:Arial,sans-serif;color:#141414;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#ffffff;border:1px solid #e6e6e6;border-radius:18px;padding:28px;">
              <tr>
                <td align="center" style="padding-bottom:20px;">
                  <div style="display:inline-block;background:#141414;color:#fbb725;padding:10px 14px;border-radius:10px;font-size:12px;letter-spacing:3px;font-weight:700;">
                    VON MARINS
                  </div>
                </td>
              </tr>
              <tr>
                <td style="font-size:24px;font-weight:700;line-height:1.2;padding-bottom:12px;">${title}</td>
              </tr>
              <tr>
                <td style="font-size:15px;line-height:1.6;color:#3b3b3b;padding-bottom:24px;">${description}</td>
              </tr>
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <a href="${ctaUrl}" style="display:inline-block;background:#141414;color:#fbb725;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700;">
                    ${ctaLabel}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="font-size:12px;line-height:1.6;color:#666;">
                  Se você não solicitou esta ação, ignore este e-mail.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

export function confirmEmailTemplate(url: string) {
  return baseTemplate(
    "Confirme seu e-mail",
    "Para ativar sua conta na Von Marins, confirme seu endereço de e-mail no botão abaixo.",
    "Confirmar e-mail",
    url,
  );
}

export default confirmEmailTemplate;
