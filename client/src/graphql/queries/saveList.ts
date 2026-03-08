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
  query GetSaveLists($userId: ID!) {
    getUserSaveList(userId: $userId) {
      id
    }
  }
`;

export const IS_SAVED = gql`
  query IsSaved($postId: ID!, $userId: ID!) {
    isSaved(postId: $postId, userId: $userId)
  }
`;
