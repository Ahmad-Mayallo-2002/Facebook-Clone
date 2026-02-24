import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($take: Int!, $skip: Int!) {
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

export const GET_USER_POSTS = gql`
  query GetUserPosts($take: Int!, $skip: Int!, $userId: String!) {
    getUserPosts(take: $take, skip: $skip, userId: $userId) {
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
