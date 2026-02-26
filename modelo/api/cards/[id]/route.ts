// app/api/cards/route.ts
import { db } from "@/app/(auth)/lib/db";
import { encrypt } from "@/lib/encryption";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;
export async function POST(req: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const { cardData } = await req.json();

    if (!cardData.number || !cardData.cpf || !cardData.holder) {
      return new NextResponse("Dados do cartão incompletos", { status: 400 });
    }

    const encrypted = encrypt(
      JSON.stringify({
        number: cardData.number,
        cpf: cardData.cpf,
      }),
    );

    const card = await db.card.create({
      data: {
        userId: params.id,
        encryptedData: encrypted.content,
        iv: encrypted.iv,
        firstSixDigits: cardData.number.slice(0, 6),
        lastFourDigits: cardData.number.slice(-4),
        issuer: cardData.issuer,
        holderName: cardData.holder,
        operationType: cardData.operationType,
        issuerId: cardData.issuerId.toString(),
        paymentMethodId: cardData.paymentMethodId.toString(),
        isDefault: false,
      },
    });

    return NextResponse.json({
      id: card.id,
      firstSixDigits: card.firstSixDigits,
      lastFourDigits: card.lastFourDigits,
      issuer: card.issuer,
    });
  } catch (error) {
    console.error("[CARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
