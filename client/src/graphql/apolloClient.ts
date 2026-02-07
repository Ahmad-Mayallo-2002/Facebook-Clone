import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_LINK }),
});
