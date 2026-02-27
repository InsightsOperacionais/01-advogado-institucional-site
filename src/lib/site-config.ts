export const siteConfig = {
  name: "Von Marins Advocacia",
  shortName: "Von Marins",
  url: "https://www.vonmarins.com.br",
  locale: "pt_BR",
  description:
    "Boutique jurídica especializada em societário, M&A, engenharia fiscal e governança sucessória para operações de alta complexidade.",
  keywords: [
    "Advocacia empresarial",
    "Direito societário",
    "M&A",
    "Governança sucessória",
    "Planejamento tributário",
    "Direito corporativo",
  ],
  contactEmail: "contato@vonmarins.com.br",
  social: {
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
  },
  pages: [
    "/",
    "/sobre",
    "/atuacao",
    "/equipe",
    "/insights",
    "/contato",
    "/landing-page-1",
    "/landing-page-2",
    "/landing-page-3",
    "/instagram-1",
    "/privacidade",
    "/termos-de-uso",
  ],
} as const;

export const noIndexRoutes = [
  "/login",
  "/registro",
  "/register",
  "/reset",
  "/new-password",
  "/new-verification",
  "/error",
] as const;
