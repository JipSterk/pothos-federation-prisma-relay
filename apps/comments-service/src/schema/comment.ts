import { Comment, db } from "@acme/database";
import { builder } from "../builder";
import { UserRef } from "./user";

const Comment = builder.prismaNode("Comment", {
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

builder.asEntity(Comment, {
  key: builder.selection<Pick<Comment, "id">>("id"),
  resolveReference: ({ id }) => db.comment.findFirst({ where: { id } }),
});

builder.mutationField("createComment", (t) =>
  t.prismaField({
    type: "Comment",
    args: {
      userId: t.arg.globalID(),
      body: t.arg.string(),
    },
    resolve: (query, _root, { userId, body }) => {
      return db.comment.create({
        data: {
          user: {
            connect: {
              id: userId.id,
            },
          },
          body,
        },
        ...query,
      });
    },
  })
);

builder.queryField("comment", (t) =>
  t.prismaField({
    type: "Comment",
    nullable: true,
    args: {
      commentId: t.arg.globalID(),
    },
    resolve: (query, _root, { commentId }) => {
      return db.comment.findUniqueOrThrow({
        ...query,
        where: { id: commentId.id },
      });
    },
  })
);
