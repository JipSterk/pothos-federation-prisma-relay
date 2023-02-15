import { SupergraphSdlHook } from "@apollo/gateway";
import chokidar from "chokidar";
import { readFile } from "fs/promises";
import { resolve } from "path";

/**
 * get supergraph sdl for development purposes
 * @param options supergraph sdl options
 * @returns {ReturnType<SupergraphSdlHook>}
 */
export const supergraphSdl: SupergraphSdlHook = async ({
  update,
  healthCheck,
}): ReturnType<SupergraphSdlHook> => {
  const superGraphqlSdlLocation = resolve(__dirname, "../../supergraph.gql");
  const watcher = chokidar.watch(superGraphqlSdlLocation);

  watcher.on("change", async () => {
    try {
      const updatedSupergraphSdl = await readFile(
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
    supergraphSdl: await readFile(superGraphqlSdlLocation, "utf-8"),
    cleanup: async () => {
      await watcher.close();
    },
  };
};
