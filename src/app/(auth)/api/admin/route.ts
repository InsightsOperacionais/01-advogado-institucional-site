import { currentRole } from "@/app/(auth)/lib/auth"
import { UserRole } from "@/generated/prisma/enums"
import { NextResponse } from "next/server"

export async function GET() {
  const role = await currentRole()

  if (role === UserRole.Admin) {
    return new NextResponse(null, { status: 200 })
  }

  return new NextResponse(null, { status: 403 })
}
