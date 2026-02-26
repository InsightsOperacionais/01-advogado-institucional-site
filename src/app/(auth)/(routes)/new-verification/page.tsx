import { NewVerificationForm } from "@/app/(auth)/_components/new-verification-form";
import { Suspense } from "react";

export default function NewVerificationPage() {
  return (
    <Suspense fallback={null}>
      <NewVerificationForm />
    </Suspense>
  );
}
