import { gql } from "@apollo/client";

export const CLEAR_SAVE_LIST = gql`
  mutation ClearSaveList($userId: ID!) {
    clearSaveList(userId: $userId)
  }
`;

export const DELETE_SAVE_ITEM = gql`
  mutation DeleteSaveItem($postId: ID!, $userId: ID!) {
    deleteSaveItem(postId: $postId, userId: $userId)
  }
`;

export const ADD_TO_SAVE_LIST = gql`
  mutation AddToSaveList($postId: ID!, $userId: ID!) {
    addToSaveList(postId: $postId, userId: $userId)
  }
`;
