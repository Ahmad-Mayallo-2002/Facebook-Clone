import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($take: Float!, $skip: Float!) {
    getPosts(take: $take, skip: $skip) {
      pagination {
        prev
        next
        totalPages
        currentPage
      }
      data {
        id
        content
        media {
          url
          public_id
        }
        userId
        createdAt
        updatedAt
        # Author
        user {
          id
          username
          image {
            url
            public_id
          }
        }
      }
    }
  }
`;
