import { gql } from "@apollo/client";

export const GET_SAVE_LISTS = gql`
  query GetSaveLists($skip: Int!, $take: Int!) {
    getSaveLists(skip: $skip, take: $take) {
      data {
        id
      }
    }
  }
`;

export const GET_USER_SAVE_LIST = gql`
  query GetUserSaveList($userId: ID!) {
    getUserSaveList(userId: $userId) {
      id
      saveItems {
        id
        post {
          id
          media {
            public_id
            url
          }
          content
          createdAt
          user {
            username
            id
            image {
              public_id
              url
            }
          }
        }
      }
    }
  }
`;

export const IS_SAVED = gql`
  query IsSaved($postId: ID!, $userId: ID!) {
    isSaved(postId: $postId, userId: $userId)
  }
`;
