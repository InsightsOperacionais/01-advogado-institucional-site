import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "@/app/(auth)/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
} from "@/app/(auth)/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  if (pathname.startsWith(apiAuthPrefix)) {
    return;
  }

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(`${pathname}${nextUrl.search}`);
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
