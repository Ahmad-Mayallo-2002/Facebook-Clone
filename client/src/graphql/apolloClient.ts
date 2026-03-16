import { ApolloClient, InMemoryCache } from "@apollo/client";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            keyArgs: false,
            merge(existing = { data: [], pagination: {} }, incoming) {
              return {
                ...incoming,
                data: [...existing.data, ...(incoming.data || [])],
              };
            },
          },
          getUserPosts: {
            keyArgs: ["userId"],
            merge(existing = { data: [], pagination: {} }, incoming) {
              return {
                ...incoming,
                data: [...existing.data, ...(incoming.data || [])],
              };
            },
          },
          getPostComments: {
            keyArgs: ["postId"],
            merge(existing = { data: [], pagination: {} }, incoming) {
              return {
                ...incoming,
                data: [...existing.data, ...(incoming.data || [])],
              };
            },
          },
          getPostReacts: {
            keyArgs: ["postId"],
            merge(existing = { data: [], pagination: {} }, incoming) {
              return {
                ...incoming,
                data: [...existing.data, ...(incoming.data || [])],
              };
            },
          },
        },
      },
    },
  }),
  link: new UploadHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_LINK,
    credentials: "include",
    headers: {
      "apollo-require-preflight": "true",
    },
  }),
});
