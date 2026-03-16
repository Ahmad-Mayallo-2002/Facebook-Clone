import { gql } from "@apollo/client";

export const ADD_PAGE_FOLLOWING = gql`
  mutation ($userId: String!, $pageId: String!) {
    addPageFollowing(userId: $userId, pageId: $pageId) {
      id
    }
  }
`;

export const ADD_USER_FOLLOWING = gql`
  mutation ($targetId: String!, $userId: String!) {
    addUserFollowing(targetId: $targetId, userId: $userId) {
      id
    }
  }
`;

export const CANCEL_FOLLOWING = gql`
  mutation ($targetId: String!, $userId: String!) {
    cancelFollowing(targetId: $targetId, userId: $userId)
  }
`;
