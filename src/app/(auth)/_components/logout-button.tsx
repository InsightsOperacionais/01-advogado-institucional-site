"use client";

import { logout } from "@/app/(auth)/actions/logout";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      logout().finally(() => {
        router.refresh();
      });
    });
  };

  return (
    <div onClick={onClick} className={`cursor-pointer ${className ?? ""}`} aria-disabled={isPending}>
      {children}
    </div>
  );
};
