import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () =>
  new ApolloClient({
    uri: "https://api.subquery.network/sq/Sahil24-lab/buzzkill-contracts",
    cache: new InMemoryCache(),
  });

export default createApolloClient;
