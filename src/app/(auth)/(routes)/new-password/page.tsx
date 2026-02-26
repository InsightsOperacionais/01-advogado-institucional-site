import { NewPasswordForm } from "@/app/(auth)/_components/new-password-form";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={null}>
      <NewPasswordForm />
    </Suspense>
  );
}
