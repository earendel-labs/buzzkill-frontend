"use client";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/app/libs/apolloClient";

const client = createApolloClient();

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
