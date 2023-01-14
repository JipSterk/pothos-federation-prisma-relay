import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __globalPrisma__: PrismaClient;
}

export let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient({
    log: ["error", "warn"],
  });
} else {
  if (!global.__globalPrisma__) {
    global.__globalPrisma__ = new PrismaClient({
      log: ["query", "error", "warn"],
    });
  }

  db = global.__globalPrisma__;
}
