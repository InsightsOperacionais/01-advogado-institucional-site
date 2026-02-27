# Relatorio de Auditoria Completa do Site

Data da auditoria: 27/02/2026  
Projeto: advogado-institucional-site

## 1) Escopo auditado

Paginas institucionais:
- /
- /sobre
- /atuacao
- /equipe
- /insights
- /contato
- /landing-page-1
- /landing-page-2
- /landing-page-3
- /instagram-1

Paginas de autenticacao:
- /login
- /registro
- /register (alias com redirect)
- /reset
- /new-password
- /new-verification
- /error

Validacao de execucao em ambiente local (`next dev`):
- 16/16 rotas acima responderam 200 em teste final.
- Rotas referenciadas no conteudo, mas inexistentes: `/insights/artigo-exemplo` e `/projetos` (404).

## 2) Nota global por ponto (0-100)

| Ponto | Nota | Evidencias | O que modificar para chegar em 100 |
|---|---:|---|---|
| Pronto para producao (build/deploy) | 30 | `pnpm build` falha por import inexistente em `modelo/api/cards/[id]/decrypt/route.ts`. | Corrigir import para modulo real de DB (`@/lib/prisma-db` ou equivalente), separar/isoliar pasta `modelo` do build do app principal, adicionar CI com `pnpm build` obrigatorio em PR. |
| Qualidade de codigo (lint) | 35 | `pnpm lint` falha com erro de configuracao circular no ESLint. | Ajustar `eslint.config.mjs` para config flat sem `FlatCompat` circular, fixar versoes compativeis, adicionar lint no pre-commit/CI. |
| SEO tecnico | 35 | Metadata global ainda com placeholders (`meusite.com.br`, `Minha Marca`, `Seu Nome`), canonical global em `/`, sitemap com rota inexistente (`/projetos`). | Definir `metadataBase` real, title/description reais por pagina, canonical por rota, OpenGraph/Twitter reais, corrigir `sitemap.ts` com apenas URLs existentes e `lastModified` real. |
| Acessibilidade | 55 | Imagem sem `alt` em Equipe, formularios com labels sem `htmlFor`/`id`, links `#` sem destino. | Migrar para `next/image` com `alt` descritivo, conectar `label` + `id`, criar foco visivel padrao, remover links placeholder, revisar contraste e navegação por teclado em 100% dos componentes. |
| Performance | 54 | Muitos componentes client-side grandes, uso de `<img>` sem otimizacao, paginas landing muito extensas no cliente. | Trocar `<img>` por `next/image`, quebrar landings em blocos menores server components quando possivel, lazy-load de secoes pesadas, reduzir animacoes simultaneas e JS enviado. |
| Funcionalidade e conversao | 46 | Formularios de `/contato` e newsletter sem envio real, links internos quebrados/placeholders. | Implementar submit real com validacao, estados de sucesso/erro, envio para API/CRM, substituir todos os `href="#"` por rotas reais e criar paginas de politica/termos. |
| UX de navegacao (desktop/mobile) | 42 | Menu mobile depende de `mobileActions`, mas nenhum ponto do app registra acoes; no mobile o menu pode sumir. | Registrar `setMobileActions` no layout das rotas institucionais, garantir fallback de navegacao, testar navegacao completa em breakpoints mobile. |
| Consistencia de marca | 58 | Fluxo de auth com branding ROCERIA em um site institucional juridico. | Unificar identidade visual/textual do auth com Von Marins (textos, logo, imagens, copy), revisar portugues/ingles para consistencia editorial. |
| Seguranca aplicada | 57 | `rateLimit` retorna sempre sucesso, sem limitacao real; rota protegida declarada mas sem pagina correspondente. | Implementar rate limit real (IP + email + janela), logs de abuso, captcha opcional, revisar estrategia de rotas protegidas existentes e inexistentes. |

## 3) Nota por pagina

Criterios por pagina:
- SEO
- Acessibilidade
- Performance
- Funcionalidade/Conversao
- Consistencia de Marca
- Nota final (media ponderada)

| Pagina | SEO | A11y | Perf | Func | Marca | Nota Final |
|---|---:|---:|---:|---:|---:|---:|
| / | 35 | 60 | 55 | 45 | 82 | 55 |
| /sobre | 35 | 63 | 58 | 62 | 85 | 61 |
| /atuacao | 35 | 64 | 58 | 64 | 85 | 61 |
| /equipe | 35 | 52 | 52 | 62 | 85 | 57 |
| /insights | 30 | 58 | 55 | 42 | 85 | 54 |
| /contato | 32 | 45 | 54 | 30 | 85 | 49 |
| /landing-page-1 | 28 | 58 | 45 | 52 | 88 | 54 |
| /landing-page-2 | 28 | 58 | 45 | 52 | 86 | 54 |
| /landing-page-3 | 28 | 58 | 42 | 52 | 82 | 52 |
| /instagram-1 | 25 | 52 | 38 | 35 | 80 | 46 |
| /login | 30 | 72 | 62 | 48 | 35 | 49 |
| /registro | 30 | 72 | 62 | 48 | 35 | 49 |
| /register (redirect) | 30 | 70 | 70 | 80 | 35 | 57 |
| /reset | 30 | 72 | 62 | 50 | 35 | 50 |
| /new-password | 30 | 72 | 62 | 50 | 35 | 50 |
| /new-verification | 30 | 70 | 63 | 60 | 35 | 52 |
| /error | 30 | 72 | 63 | 60 | 35 | 52 |

## 4) Achados criticos com referencia tecnica

1. Metadata e SEO global em placeholder:
- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`

2. Build quebrado:
- `modelo/api/cards/[id]/decrypt/route.ts` (import `@/app/(auth)/lib/db` inexistente)

3. Lint quebrado:
- `eslint.config.mjs` (config atual causa falha no `pnpm lint`)

4. Conversao quebrada em formularios:
- `src/app/(routes)/contato/sections/contact-main.tsx` (sem submit real)
- `src/app/(routes)/insights/sections/newsletter-law.tsx` (sem submit real)

5. Links quebrados/placeholders:
- `src/app/(routes)/(home)/sections/insights.tsx` (`href="#"`)
- `src/app/(routes)/(home)/sections/footer.tsx` (`href="#"`)
- `src/app/(routes)/landing-page-1/page.tsx` (links `#`)
- `src/app/(routes)/landing-page-2/page.tsx` (links `#`)
- `src/app/(routes)/landing-page-3/page.tsx` (links `#`)
- `src/app/(routes)/insights/sections/featured-post.tsx` (`/insights/artigo-exemplo` inexistente)

6. Acessibilidade:
- `src/app/(routes)/equipe/sections/team-culture.tsx` (`<img>` sem `alt`)
- `src/components/layout/io-menu/io-menu.tsx` (container clicavel sem semantica de botao)

7. Navegacao mobile incompleta:
- `src/components/layout/io-mobile-menu/io-mobile-menu.tsx`
- `src/components/layout/io-mobile-menu/mounteds/home-mobile-menu.tsx` (nao conectado ao layout atual)

8. Inconsistencia de marca no auth:
- `src/app/(auth)/_components/split-layout.tsx`
- `src/app/(auth)/_components/login-form.tsx`
- `src/app/(auth)/auth.config.ts`

9. Seguranca/rate limiting:
- `src/app/(auth)/lib/rate-limit.ts` (stub sem limitacao real)

## 5) Plano para buscar nota 100 em todos os pontos

### Fase P0 (impacto imediato)
1. Corrigir build e lint para pipeline verde.
2. Trocar metadata/SEO placeholder por dados reais + canonical por pagina.
3. Corrigir todos os links quebrados e `href="#"`.
4. Implementar submit real em `/contato` e newsletter de `/insights`.

### Fase P1 (qualidade de experiencia)
1. Resolver navegacao mobile (acoes registradas globalmente nas rotas).
2. Unificar branding do auth para identidade institucional.
3. Corrigir acessibilidade base: `alt`, `label/htmlFor`, foco teclado, semantica de botoes.

### Fase P2 (excelencia tecnica)
1. Migrar imagens relevantes para `next/image` com `sizes` adequados.
2. Reduzir JS client em landings (quebrar componentes e mover partes para server components).
3. Implementar rate limit real e observabilidade de autenticacao.
4. Adicionar suite de auditoria automatica (Lighthouse CI + axe + testes de smoke de rotas).

## 6) Meta objetiva para nota 100

Para atingir 100 de forma sustentavel:
- Build e lint 100% verdes em CI.
- 0 links quebrados e 0 placeholders em producao.
- Metadata completa por pagina e sitemap apenas com rotas validas.
- Formularios funcionando com validacao, feedback e persistencia.
- WCAG AA nos fluxos principais (teclado, foco, contraste, labels, alt).
- Core Web Vitals no verde em mobile e desktop.
- Identidade visual e textual unica em todas as rotas (incluindo auth).
- Controles de seguranca ativos (rate limit, logging e protecoes de abuso).
