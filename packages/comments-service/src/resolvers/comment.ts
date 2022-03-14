import { builder } from "../builder";

builder.prismaNode("Comment", {
  findUnique: (id) => ({ id }),
  id: {
    resolve: (comment) => comment.id,
  },
  fields: (t) => ({
    body: t.exposeString("body"),
    user: t.relation("user"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
  }),
});
