import {
  ApolloClient,
  InMemoryCache
} from "apollo-boost";
import {
  createUploadLink
} from "apollo-upload-client";
import {
  setContext
} from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import {
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./fragmentTypes.json";
import favorites from "services/favorites";
import initFiltersData from "lib/initFiltersData";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === "undefined") {
  global.fetch = fetch;
}

function create(initialState, {
  getToken,
  fetchOptions
}) {
  const uploadLink = createUploadLink({
    uri: typeof window === "undefined" ?
      process.env.GRAPHQL_URL : process.env.GRAPHQL_BROWSER_URL,
    credentials: "same-origin",
    fetchOptions
  });

  const authLink = setContext((_, {
    headers
  }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== "undefined";

  const cache = new InMemoryCache({
    fragmentMatcher,
    typePolicies: {
      PageAllLangs: {
        keyFields: ["key"]
      }
    },
  }).restore(
    initialState || {}
  );

  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(uploadLink),
    cache,
    resolvers: {}
  });

  const getFavoritesCount = () => {
    if (!isBrowser) {
      return 0;
    }

    return favorites.getFavoritesCountFromCookies();
  };

  const data = {
    step: 0,
    favorites_count: getFavoritesCount(),
    filters: initFiltersData
  };

  cache.writeData({
    data
  });

  client.onClearStore(() => cache.writeData({
    data
  }));

  return client;
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    let fetchOptions = {};
    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    if (process.env.https_proxy) {
      fetchOptions = {
        agent: new(require("https-proxy-agent"))(process.env.https_proxy)
      };
    }
    return create(initialState, {
      ...options,
      fetchOptions
    });
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}