import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === "undefined") {
  global.fetch = fetch;
}

function create(initialState, { getToken, fetchOptions }) {
  const httpLink = createHttpLink({
    uri:
      typeof window === "undefined"
        ? process.env.GRAPHQL_URL
        : process.env.GRAPHQL_BROWSER_URL,
    credentials: "same-origin",
    fetchOptions
  });

  const authLink = setContext((_, { headers }) => {
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

  const cache = new InMemoryCache().restore(initialState || {});

  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache,
    resolvers: {}
  });

  const data = {
    steps: {
      register: 0,
      forgot: 0,
      newAd: 0,
      __typename: "Steps"
    },
    filters: {
      girls: {
        location: "",
        services: [],
        gender: "",
        race_type: "",
        __typename: "GirlFilters"
      },
      boys: {
        location: "",
        services: [],
        gender: "",
        race_type: "",
        __typename: "BoyFilters"
      },
      couple: {
        location: "",
        services: [],
        gender: "",
        race_type: "",
        __typename: "CoupleFilters"
      },
      clubs: {
        location: "",
        event_type: "",
        perimeter: 10,
        __typename: "ClubFilters"
      },
      events: {
        location: "",
        event_type: "",
        perimeter: 10,
        date: "",
        __typename: "EventFilters"
      },
      __typename: "Filters"
    }
  };

  cache.writeData({ data });

  client.onClearStore(() => cache.writeData({ data }));

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
        agent: new (require("https-proxy-agent"))(process.env.https_proxy)
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
