import { gql } from "@apollo/client";

export const GET_USER_FOLLOWERS = gql`
  query ($skip: Int!, $take: Int!, $userId: String!) {
    getUserFollowers(skip: $skip, take: $take, userId: $userId) {
      data {
        id
        follower {
          username
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
        follower {
          username
        }
      }
    }
  }
`;
