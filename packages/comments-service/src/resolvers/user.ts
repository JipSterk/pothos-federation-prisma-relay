import { User } from "@prisma/client";
import { builder } from "../builder";
import { db } from "../utils/prisma";

export const UserRef = builder
  .externalRef("User", builder.selection<Pick<User, "id">>("id"))
  .implement({
    externalFields: (t) => ({
      id: t.id(),
    }),
    fields: (t) => ({
      comments: t.prismaField({
        type: ["Comment"],
        resolve: async (query, parent) =>
          (await db.user.findUnique({ where: { id: parent.id } }).comments({
            orderBy: {
              updatedAt: "desc",
            },
            ...query,
          })) ?? [],
      }), 
    }),
  });
