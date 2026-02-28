import { gql } from "@apollo/client";

export const GET_USER_FOLLOWERS = gql`
  query ($skip: Int!, $take: Int!, $userId: String!) {
    getUserFollowers(skip: $skip, take: $take, userId: $userId) {
      data {
        id
        follower {
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

export const GET_USER_FOLLOWINGS = gql`
  query ($skip: Int!, $take: Int!, $userId: String!) {
    getUserFollowings(skip: $skip, take: $take, userId: $userId) {
      data {
        id
        followingUserId
        followingUser {
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

export const FOLLOWER_OR_NOT = gql`
  query ($targetId: String!) {
    followerOrNot(targetId: $targetId)
  }
`;

export const GET_PAGE_FOLLOWERS = gql`
  query ($skip: Int!, $take: Int!, $pageId: String!) {
    getPageFollowers(skip: $skip, take: $take, pageId: $pageId) {
      data {
        id
        follower {
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
