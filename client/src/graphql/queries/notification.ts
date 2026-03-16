import { gql } from "@apollo/client";

export const GET_RECEIVER_NOTIFICATIONS = gql`
  query ($skip: Int!, $take: Int!) {
    getReceiverNotifications(skip: $skip, take: $take) {
      data {
        content
        type
        id
        createdAt
        sender {
          id
          username
          image {
            url
            public_id
          }
        }
      }

      pagination {
        next
        prev
      }
    }
  }
`;
