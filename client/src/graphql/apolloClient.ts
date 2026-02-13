import { ApolloClient, InMemoryCache } from "@apollo/client";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new UploadHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_LINK,
    credentials: "include",
    headers: {
      "apollo-require-preflight": "true",
    },
  }),
});
