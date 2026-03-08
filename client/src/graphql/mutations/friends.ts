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
