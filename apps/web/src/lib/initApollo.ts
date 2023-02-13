import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  ApolloReducerConfig,
  NormalizedCacheObject,
} from "@apollo/client/cache";
import { createHttpLink, HttpOptions } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { isBrowser } from "../utils/isBrowser";

/**
 * Apollo map
 */
const apolloMap: { [key: string]: ApolloClient<NormalizedCacheObject> } = {};

/**
 * creates an ApolloClient
 * @param linkOptions options for the http link
 * @param initialState initial state for the InMemoryCache
 * @param options get token object
 * @param cacheConfig config object for the InMemoryCache
 * @returns {ApolloClient<NormalizedCacheObject>}
 */
function create(
  linkOptions: HttpOptions,
  initialState: NormalizedCacheObject = {},
  { getToken }: { getToken: () => Promise<string | undefined> },
  cacheConfig: ApolloReducerConfig = {}
): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLink(linkOptions);

  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(cacheConfig).restore(initialState),
    name: "[web]",
    version: "0.0.1",
  });
}

/**
 * initializes Apollo
 * @param linkOptions options for the http link
 * @param initialState initial state for the InMemoryCache
 * @param options get token object
 * @param cacheConfig config object for the InMemoryCache
 * @returns {ApolloClient<NormalizedCacheObject>}
 */
export function initApollo(
  linkOptions: HttpOptions,
  initialState: NormalizedCacheObject,
  options: { getToken: () => Promise<string | undefined> },
  cacheConfig: ApolloReducerConfig = {}
): ApolloClient<NormalizedCacheObject> {
  if (!isBrowser) {
    return create(linkOptions, initialState, options, cacheConfig);
  }

  if (!apolloMap[linkOptions.uri as string]) {
    apolloMap[linkOptions.uri as string] = create(
      linkOptions,
      initialState,
      options,
      cacheConfig
    );
  }

  return apolloMap[linkOptions.uri as string];
}
