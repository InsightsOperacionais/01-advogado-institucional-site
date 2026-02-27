export function twoFactorTemplate(token: string) {
  return `
  <!doctype html>
  <html lang="pt-BR">
    <body style="margin:0;padding:24px;background:#f1f1f1;font-family:Arial,sans-serif;color:#141414;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table width="560" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;background:#ffffff;border:1px solid #e6e6e6;border-radius:18px;padding:28px;">
              <tr>
                <td style="font-size:24px;font-weight:700;line-height:1.2;padding-bottom:12px;">
                  Código de autenticação Von Marins
                </td>
              </tr>
              <tr>
                <td style="font-size:15px;line-height:1.6;color:#3b3b3b;padding-bottom:20px;">
                  Use o código abaixo para concluir seu login. Ele expira em poucos minutos.
                </td>
              </tr>
              <tr>
                <td align="center" style="font-size:32px;font-weight:700;letter-spacing:6px;color:#141414;padding:10px 0 18px;">
                  ${token}
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

export default twoFactorTemplate;
