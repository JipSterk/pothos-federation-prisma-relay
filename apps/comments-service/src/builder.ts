import { db } from "@acme/database";
import type PrismaTypes from "@acme/database/src";
import SchemaBuilder from "@pothos/core";
import DirectivesPlugin from "@pothos/plugin-directives";
import FederationPlugin from "@pothos/plugin-federation";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import ValidationPlugin from "@pothos/plugin-validation";
import { Context } from "./types/Context";

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
    nodeQueryOptions: false,
    nodesQueryOptions: false,
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
