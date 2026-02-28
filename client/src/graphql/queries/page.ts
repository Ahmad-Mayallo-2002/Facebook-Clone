import { gql } from "@apollo/client";

export const GET_USER_PAGES = gql`
  query ($userId: String!, $take: Int!, $skip: Int!) {
    getUserPages(userId: $userId, take: $take, skip: $skip) {
      data {
        id
        createdAt
        updatedAt
        image {
          url
          public_id
        }
        banner {
          url
          public_id
        }
        description
      }
    }
  }
`;

export const GET_PAGE = gql`
  query ($id: String!) {
    getPage(id: $id) {
      id
      createdAt
      updatedAt
      image {
        url
        public_id
      }
      banner {
        url
        public_id
      }
      description
      userId
    }
  }
`;
