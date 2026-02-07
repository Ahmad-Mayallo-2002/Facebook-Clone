import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($input: AuthInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation ($input: RegisterInput!) {
    register(input: $input) {
      id
    }
  }
`;
