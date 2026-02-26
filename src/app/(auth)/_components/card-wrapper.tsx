"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/shadcnui/base/card";
import { BackButton } from "./back-button";
import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerSubtitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  showBackButton?: boolean;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerSubtitle,
  backButtonLabel,
  backButtonHref,
  showSocial,
  showBackButton = true,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] border-none bg-transparent">
      <CardHeader className="text-center">
        <Header title={headerTitle} subtitle={headerSubtitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <div className="my-6 h-[1px] w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      {/* {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )} */}
      {showBackButton && (
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      )}
    </Card>
  );
};
