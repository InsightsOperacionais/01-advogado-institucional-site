import { auth } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";

import { MinhaContaView } from "./_components/minha-conta-view";
import { getAccountOverview } from "./_lib/get-account-overview";

export default async function MinhaContaPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=%2Fminha-conta");
  }

  const overview = await getAccountOverview(session.user.id);

  if (!overview) {
    redirect("/login?callbackUrl=%2Fminha-conta");
  }

  return <MinhaContaView data={overview} />;
}
