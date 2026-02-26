import { RegisterForm } from "@/app/(auth)/_components/register-form";
import { Suspense } from "react";

export default function RegistroPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
