import { gql } from "@apollo/client";

export const GET_USER_REACT_ON_POST = gql`
  query GetUserReactOnPost($postId: String!) {
    getUserReactOnPost(postId: $postId) {
      id
      value
    }
  }
`;

export const GET_POST_REACTS = gql`
  query GetPostReacts($skip: Int!, $take: Int!, $postId: String!) {
    getPostReacts(skip: $skip, take: $take, postId: $postId) {
      data {
        id
        value
        user {
          id
          username
          image {
            url
            public_id
          }
        }
      }

      pagination {
        next
      }
    }
  }
`;
