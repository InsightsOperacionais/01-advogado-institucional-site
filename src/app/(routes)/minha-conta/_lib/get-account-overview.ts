import { db } from "@/lib/prisma-db";

export type AccountOrderSummary = {
  id: string;
  orderNumber: number;
  status: string;
  createdAt: Date;
  total: number | null;
  itemCount: number | null;
};

export type AccountOverview = {
  profile: {
    id: string;
    name: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    role: string;
    isTwoFactorEnabled: boolean;
    emailVerified: Date | null;
  };
  orders: AccountOrderSummary[];
};

function readNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function extractOrderTotal(amount: unknown): number | null {
  if (!amount || typeof amount !== "object") return null;

  const source = amount as Record<string, unknown>;

  return (
    readNumber(source.amount_total) ??
    readNumber(source.total) ??
    readNumber(source.amountTotal) ??
    null
  );
}

function extractItemCount(items: unknown): number | null {
  if (Array.isArray(items)) {
    return items.length;
  }

  if (items && typeof items === "object") {
    const source = items as Record<string, unknown>;
    if (Array.isArray(source.items)) {
      return source.items.length;
    }
  }

  return null;
}

export async function getAccountOverview(
  userId: string,
): Promise<AccountOverview | null> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      isTwoFactorEnabled: true,
      emailVerified: true,
      orders: {
        take: 6,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          order: true,
          status: true,
          createdAt: true,
          amount: true,
          items: true,
        },
      },
    },
  });

  if (!user) return null;

  return {
    profile: {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      emailVerified: user.emailVerified,
    },
    orders: user.orders.map((order) => ({
      id: order.id,
      orderNumber: order.order,
      status: order.status,
      createdAt: order.createdAt,
      total: extractOrderTotal(order.amount),
      itemCount: extractItemCount(order.items),
    })),
  };
}
