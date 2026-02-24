import { gql } from "@apollo/client";

export const CREATE_PAGE = gql`
  mutation ($input: PageInput!, $userId: String!) {
    createPage(input: $input, userId: $userId) {
      id
    }
  }
`;
