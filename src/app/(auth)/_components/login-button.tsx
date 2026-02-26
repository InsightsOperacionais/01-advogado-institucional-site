"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/shadcnui/base/dialog";
import { LoginForm } from "./login-form";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-auto border-none bg-transparent p-0 shadow-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
