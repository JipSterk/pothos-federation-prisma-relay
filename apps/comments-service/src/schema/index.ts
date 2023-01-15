import { GraphQLSchema } from "graphql";
import { builder } from "../builder";
import "./comment";
import "./user";

export const schema: GraphQLSchema = builder.toSubGraphSchema({});
