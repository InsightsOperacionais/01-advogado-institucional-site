import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import type { UserRole } from "@/generated/prisma/enums";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  cookies: {
    sessionToken: {
      name: `${process.env.PROJECT_NAME ?? "vonmarins"}-auth-session`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = (token.name as string | null) ?? null;
        session.user.email = (token.email as string | undefined) ?? "";
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.image = (token.image as string | null | undefined) ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
