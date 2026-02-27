import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

let prismaInstance: PrismaClient | undefined;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export function getDb() {
  if (globalThis.prisma) {
    return globalThis.prisma;
  }

  if (prismaInstance) {
    return prismaInstance;
  }

  prismaInstance = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prismaInstance;
  }

  return prismaInstance;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getDb();
    const value = Reflect.get(client, prop, receiver);

    if (typeof value === "function") {
      return value.bind(client);
    }

    return value;
  },
});
