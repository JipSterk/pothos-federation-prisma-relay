import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginUsageReporting,
  Context as ApolloServerContext,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import http from "http";
import { AddressInfo } from "net";
import { builder } from "./builder";
import "./resolvers";
import { Context } from "./types/Context";

const { NODE_ENV, PORT } = process.env;

/**
 * starts the server
 */
async function main(port: number): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = builder.toSubGraphSchema({});

  const server = new ApolloServer({
    schema,
    stopOnTerminationSignals: true,
    context: ({ req, res }): ApolloServerContext<Context> => ({
      req,
      res,
    }),
    plugins: [
      NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginUsageReporting(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  const listener = httpServer.listen({ port }, () => {
    const { address, port } = listener.address() as AddressInfo;
    console.log(`Accounts service ready at http://${address}:${port}`);
  });
}

main(Number(PORT)).catch((error) => {
  console.error(error);
  process.exit(1);
});
