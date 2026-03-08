import { gql } from "@apollo/client";

export const GET_ALL_FRIENDS = gql`
  query GetAllFriends($take: Int!) {
    getAllFriends(take: $take) {
      data {
        id
      }
    }
  }
`;

export const GET_USER_FRIENDS = gql`
  query GetUserFriends($userId: ID!, $take: Int!) {
    getUserSaveList(userId: $userId, take: $take) {
      data {
        id
      }
    }
  }
`;

export const GET_SENDER_REQUESTS = gql`
  query GetSenderRequests($senderId: ID!, $take: Int!) {
    getSenderRequests(senderId: $senderId, take: $take) {
      data {
        id
      }
    }
  }
`;

export const GET_RECEIVER_REQUESTS = gql`
  query GetReceiverRequests($receiverId: ID!, $take: Int!) {
    getReceiverRequests(receiverId: $receiverId, take: $take) {
      data {
        id
      }
    }
  }
`;
