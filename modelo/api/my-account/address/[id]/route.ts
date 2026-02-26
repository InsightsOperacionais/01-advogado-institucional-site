import { db } from "@/app/(auth)/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function PATCH(req: Request, props: { params: Params }) {
  const params = await props.params;
  try {
    const body = await req.json();
    const { address } = body;

    if (!address)
      return new NextResponse("Address is required", { status: 400 });

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/clients/${params.id}`,
        {
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
          },
        },
      );
    } catch (error) {
      console.error("External API error:", error);
      return new NextResponse("Failed to update user in external service", {
        status: 502,
      });
    }

    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: {
        address,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[Error in PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
