import { db } from "@/app/(auth)/lib/db";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function PATCH(req: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const body = await req.json();
    const { password } = body;

    if (!password)
      return new NextResponse("password is required", { status: 400 });

    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: {
        password,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[Error in PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
