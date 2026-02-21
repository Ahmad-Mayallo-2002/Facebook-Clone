import { gql } from "@apollo/client";

export const GET_POST_COMMENTS = gql`
  query GetPostComments($skip: Int!, $take: Int!, $postId: String!) {
    getPostComments(skip: $skip, take: $take, postId: $postId) {
      data {
        id
        content
        media {
          url
          public_id
        }
        createdAt
        user {
          id
          username
          image {
            url
            public_id
          }
        }
        userId
      }

      pagination {
        next
      }
    }
  }
`;
