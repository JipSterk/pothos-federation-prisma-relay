import { User } from "@prisma/client";
import { builder } from "../builder";
import { db } from "../utils/prisma";

const User = builder.prismaNode("User", {
  findUnique: (id) => ({ id }),
  id: {
    resolve: (user) => user.id,
  },
  fields: (t) => ({
    email: t.exposeString("email"),
    firstName: t.exposeString("firstName"),
    lastName: t.exposeString("lastName"),
    createdAt: t.expose("createdAt", {
      type: "DateTime",
    }),
    updatedAt: t.expose("updatedAt", {
      type: "DateTime",
    }),
  }),
});

builder.asEntity(User, {
  key: builder.selection<Pick<User, "id">>("id"),
  resolveReference: ({ id }) => db.user.findFirst({ where: { id } }),
});

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      email: t.arg.string(),
      firstName: t.arg.string(),
      lastName: t.arg.string(),
    },
    resolve: (query, _root, { email, firstName, lastName }) => {
      return db.user.create({
        data: {
          email,
          firstName,
          lastName,
        },
        ...query,
      });
    },
  })
);

builder.queryField("user", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    args: {
      userId: t.arg.globalID(),
    },
    resolve: (query, _root, { userId }) => {
      return db.user.findUnique({
        ...query,
        where: { id: userId.id },
        rejectOnNotFound: true,
      });
    },
  })
);
