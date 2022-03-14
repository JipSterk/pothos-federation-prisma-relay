import { User } from "@prisma/client";
import { builder } from "../builder";
import { db } from "../utils/prisma";

const User = builder
  .externalRef("User", builder.selection<Pick<User, "id">>("id"))
  .implement({
    externalFields: (t) => ({
      id: t.id(),
    }),
    fields: (t) => ({
      comments: t.prismaField({
        type: ["Comment"],
        resolve: (query, parent) =>
          db.user.findUnique({ where: { id: parent.id } }).comments({
            orderBy: {
              updatedAt: "desc",
            },
            ...query,
          }),
      }),
    }),
  });
