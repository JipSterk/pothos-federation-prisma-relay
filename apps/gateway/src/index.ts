import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { json } from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import { AddressInfo } from "net";

const { NODE_ENV, PORT } = process.env;

/**
 * starts the server
 */
async function main(port: number): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);

  const gateway = new ApolloGateway({
    supergraphSdl: (await import("./utils/localSuperGraphqlSdl")).supergraphSdl,
    debug: NODE_ENV !== "production",
  });

  const server = new ApolloServer({
    gateway,
    stopOnTerminationSignals: true,
    plugins: [
      NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({
            includeCookies: true,
          }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors({
      credentials: true,
      origin:
        NODE_ENV === "production"
          ? ["https://studio.apollographql.com"]
          : ["https://studio.apollographql.com"],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
      }),
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  const { address } = httpServer.address() as AddressInfo;
  console.log(`Apollo Gateway ready at http://${address}:${port}`);
}

main(Number(PORT)).catch((error) => {
  console.error(error);
  process.exit(1);
});
