import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  Context as ApolloServerContext,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import { AddressInfo } from "net";
import { Context } from "./types/Context";

const { NODE_ENV, PORT } = process.env;

/**
 * starts the server
 */
async function main(port: number): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    cors({
      credentials: true,
      origin:
        NODE_ENV === "production"
          ? ["https://studio.apollographql.com"]
          : ["https://studio.apollographql.com"],
    })
  );

  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: "users",
          url: "http://localhost:4001/graphql",
        },
        {
          name: "comments",
          url: "http://localhost:4002/graphql",
        },
      ],
    }),
    debug: NODE_ENV !== "production",
  });

  const server = new ApolloServer({
    gateway,
    stopOnTerminationSignals: true,
    context: ({ req, res }): ApolloServerContext<Context> => ({
      req,
      res,
    }),
    plugins: [
      NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  const listener = httpServer.listen({ port }, () => {
    const { address, port } = listener.address() as AddressInfo;
    console.log(`Apollo Gateway ready at http://${address}:${port}`);
  });
}

main(Number(PORT)).catch((error) => {
  console.error(error);
  process.exit(1);
});
