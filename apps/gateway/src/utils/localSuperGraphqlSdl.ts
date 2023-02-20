import { SupergraphSdlHook } from "@apollo/gateway";
import chokidar from "chokidar";
import fs from "fs/promises";
import path from "path";

/**
 * get supergraph sdl for development purposes
 * @param options supergraph sdl options
 * @returns {ReturnType<SupergraphSdlHook>}
 */
export const supergraphSdl: SupergraphSdlHook = async ({
  update,
  healthCheck,
}): ReturnType<SupergraphSdlHook> => {
  const superGraphqlSdlLocation = path.resolve(
    __dirname,
    "../../supergraph.gql"
  );
  const watcher = chokidar.watch(superGraphqlSdlLocation);

  watcher.on("change", async () => {
    try {
      const updatedSupergraphSdl = await fs.readFile(
        superGraphqlSdlLocation,
        "utf-8"
      );
      await healthCheck(updatedSupergraphSdl);
      update(updatedSupergraphSdl);
    } catch (error) {
      console.error(error);
    }
  });

  return {
    supergraphSdl: await fs.readFile(superGraphqlSdlLocation, "utf-8"),
    cleanup: async () => {
      await watcher.close();
    },
  };
};
