import { builder } from "../builder";
import { UserRef } from "./user";

builder.prismaNode("Comment", {
  findUnique: (id) => ({ id }),
  id: {
    resolve: (comment) => comment.id,
  },
  fields: (t) => ({
    body: t.exposeString("body"),
    user: t.field({
      type: UserRef,
      select: {
        user: true,
      },
      resolve: (comment) => comment.user,
    }),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
  }),
});
