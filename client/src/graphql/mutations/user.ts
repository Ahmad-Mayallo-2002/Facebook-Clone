import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation ($input: UserInput!, $id: String!) {
    updateUser(input: $input, id: $id) {
      id
    }
  }
`;
