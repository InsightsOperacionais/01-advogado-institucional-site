import type { UserRole } from "@/generated/prisma/enums";
import type { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role?: UserRole;
  isTwoFactorEnabled?: boolean;
  isOAuth?: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
  }
}
