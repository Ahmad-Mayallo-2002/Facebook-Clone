import { gql } from "@apollo/client";

export const CREATE_PAGE = gql`
  mutation ($input: PageInput!, $userId: String!) {
    createPage(input: $input, userId: $userId) {
      id
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation ($id: String!, $input: PageInput!) {
    updatePage(id: $id, input: $input) {
      id
    }
  }
`;

export const DELETE_PAGE = gql`
  mutation ($id: String!) {
    deletePage(id: $id)
  }
`;
