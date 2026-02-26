"use client";

import { IoIosExit } from "react-icons/io";

import { FaAlignJustify, FaLock } from "react-icons/fa";

import { useCurrentUser } from "@/app/(auth)/hooks/use-current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcnui/base/dropdown-menu";
import { UserRole } from "@/generated/prisma/enums";
import { CommandIcon } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar> */}
        <CommandIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {user?.role === UserRole.Admin && (
          <DropdownMenuItem>
            <FaAlignJustify className="mr-2 h-4 w-4" />
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem>
          <FaLock className="mr-2 h-4 w-4" />
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <IoIosExit className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
