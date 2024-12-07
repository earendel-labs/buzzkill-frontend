// src/lib/apolloClient.ts

// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://api.subquery.network/sq/Sahil24-lab/buzzkill-final",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
