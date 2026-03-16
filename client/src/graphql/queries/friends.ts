import { gql } from "@apollo/client";

export const GET_ALL_FRIENDS = gql`
  query GetAllFriends($take: Int!, $skip: Int!) {
    getAllFriends(take: $take, skip: $skip) {
      data {
        id
        senderId
        receiverId
        status
        sender {
          id
          username
          image {
            url
            public_id
          }
        }
        receiver {
          id
          username
          image {
            url
            public_id
          }
        }
      }
      pagination {
        prev
        next
        totalPages
        currentPage
      }
    }
  }
`;

export const GET_USER_FRIENDS = gql`
  query GetUserFriends($userId: ID!, $take: Int!, $skip: Int!) {
    getUserFriends(userId: $userId, take: $take, skip: $skip) {
      data {
        id
        senderId
        receiverId
        status
        sender {
          id
          username
          image {
            url
            public_id
          }
        }
        receiver {
          id
          username
          image {
            url
            public_id
          }
        }
      }
      pagination {
        prev
        next
        totalPages
        currentPage
      }
    }
  }
`;

export const GET_SENDER_REQUESTS = gql`
  query GetSenderRequests($senderId: ID!, $take: Int!, $skip: Int!) {
    getSenderRequests(senderId: $senderId, take: $take, skip: $skip) {
      data {
        id
        senderId
        receiverId
        status
        sender {
          id
          username
          image {
            url
            public_id
          }
        }
        receiver {
          id
          username
          image {
            url
            public_id
          }
        }
        receiverId
        senderId
      }

      pagination {
        prev
        next
        totalPages
        currentPage
      }
    }
  }
`;

export const GET_RECEIVER_REQUESTS = gql`
  query GetReceiverRequests($receiverId: ID!, $take: Int!, $skip: Int!) {
    getReceiverRequests(receiverId: $receiverId, take: $take, skip: $skip) {
      data {
        id
        sender {
          id
          username
          image {
            url
            public_id
          }
        }
        receiverId
        senderId
      }
    }
  }
`;

export const GET_IS_FRIEND = gql`
  query IsFriend($userId: ID!, $friendId: ID!) {
    isFriend(userId: $userId, friendId: $friendId)
  }
`;
