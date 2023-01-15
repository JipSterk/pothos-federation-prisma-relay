import { GraphQLSchema } from "graphql";
import { builder } from "../builder";
import "./user";

export const schema: GraphQLSchema = builder.toSubGraphSchema({});
