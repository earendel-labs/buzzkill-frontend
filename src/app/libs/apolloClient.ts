// src/lib/apolloClient.ts

// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const SubqueryDomain = process.env.NEXT_PUBLIC_SUBQUERY_DOMAIN;

const createApolloClient = () => {
  return new ApolloClient({
    uri: SubqueryDomain,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
