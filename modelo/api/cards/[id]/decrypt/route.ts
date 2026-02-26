// app/api/cards/[id]/decrypt/route.ts
import { db } from "@/app/(auth)/lib/db";
import { decrypt } from "@/lib/encryption";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET(req: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const card = await db.card.findUnique({
      where: { id: params.id },
    });

    if (!card) {
      return new NextResponse("Cartão não encontrado", { status: 404 });
    }

    const decrypted = decrypt({
      iv: card.iv,
      content: card.encryptedData,
    });

    return NextResponse.json(JSON.parse(decrypted));
  } catch (error) {
    console.error("[CARD_DECRYPT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
