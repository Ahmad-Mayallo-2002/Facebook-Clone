import { gql } from "@apollo/client";

export const SEND_FRIENDSHIP_REQUEST = gql`
  mutation SendFriendshipRequest($receiverId: ID!, $senderId: ID!) {
    sendFriendshipRequest(receiverId: $receiverId, senderId: $senderId)
  }
`;

export const ACCEPT_OR_REJECT_FRIENDSHIP_REQUEST = gql`
  mutation AcceptOrRejectFriendshipRequest(
    $status: FriendRequest!
    $receiverId: ID!
    $senderId: ID!
  ) {
    acceptOrRejectFriendshipRequest(
      status: $status
      receiverId: $receiverId
      senderId: $senderId
    )
  }
`;

export const CANCEL_FRIENDSHIP = gql`
  mutation CancelFriendship($friendshipId: ID!) {
    cancelFriendship(friendshipId: $friendshipId)
  }
`;

export const CANCEL_FRIENDSHIP_BY_USERS = gql`
  mutation CancelFriendshipByUsers($userId: ID!, $friendId: ID!) {
    cancelFriendshipByUsers(userId: $userId, friendId: $friendId)
  }
`;
