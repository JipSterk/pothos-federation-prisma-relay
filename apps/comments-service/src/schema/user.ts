import { db, User } from "@acme/database";
import { decodeGlobalID } from "@pothos/plugin-relay";
import { builder } from "../builder";

export const UserRef = builder
  .externalRef("User", builder.selection<Pick<User, "id">>("id"))
  .implement({
    externalFields: (t) => ({
      id: t.id(),
    }),
    fields: (t) => ({
      comments: t.prismaField({
        type: ["Comment"],
        resolve: async (query, parent) => {
          const { id } = decodeGlobalID(parent.id);
          return db.user.findUniqueOrThrow({ where: { id } }).comments({
            orderBy: {
              updatedAt: "desc",
            },
            ...query,
          });
        },
      }),
    }),
  });
