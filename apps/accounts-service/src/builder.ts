import type PrismaTypes from "@example/database";
import { db } from "@example/database";
import SchemaBuilder from "@pothos/core";
import DirectivesPlugin from "@pothos/plugin-directives";
import FederationPlugin from "@pothos/plugin-federation";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import ValidationPlugin from "@pothos/plugin-validation";
import { Context } from "./types/Context";

function resolveNode(typename: string, id: string) {
  switch (typename) {
    case "User":
      return db.user.findFirst({ where: { id } });
    default:
      throw new Error(
        `cannot resolve node for type: ${typename} with the id: ${id}`
      );
  }
}

export const builder = new SchemaBuilder<{
  DefaultInputFieldRequiredness: true;
  PrismaTypes: PrismaTypes;
  Context: Context;
  Scalars: {
    ID: { Input: string; Output: string | number };
    DateTime: { Input: Date; Output: Date };
  };
  AuthScopes: {
    public: boolean;
  };
}>({
  defaultInputFieldRequiredness: true,
  plugins: [
    SimpleObjectsPlugin,
    ScopeAuthPlugin,
    ValidationPlugin,
    PrismaPlugin,
    RelayPlugin,
    DirectivesPlugin,
    FederationPlugin,
  ],
  authScopes: async () => ({
    public: true,
  }),
  prisma: {
    client: db,
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
    nodeQueryOptions: {
      shareable: true,
      resolve: (_parent, { id: globalId }) => {
        const { id, typename } = globalId;

        return resolveNode(typename, id);
      },
    },
    nodesQueryOptions: {
      shareable: true,
      resolve: (_parent, { ids }) =>
        ids.map(({ id, typename }) => resolveNode(typename, id)),
    },
  },
});

builder.queryType({
  authScopes: {
    public: true,
  },
});

builder.mutationType({
  authScopes: {
    public: true,
  },
});

builder.scalarType("DateTime", {
  serialize: (date) => date.toISOString(),
  parseValue: (date) => new Date(String(date)),
});
