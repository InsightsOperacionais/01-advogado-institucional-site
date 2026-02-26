"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { DEFAULT_LOGIN_REDIRECT } from "@/app/(auth)/routes";
import { Button } from "@/components/shadcnui/base/button";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-y-2">
      <Button
        size="lg"
        className="h-11 w-full gap-2 rounded-full border-[#141414]/20 bg-white text-[#141414] hover:bg-[#fbb725]/15"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
        Continuar com Google
      </Button>
    </div>
  );
};
