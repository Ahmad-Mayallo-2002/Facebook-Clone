import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($input: AuthInput!) {
    login(input: $input) {
      token
      id
      role
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

export const FORGOT_PASSWORD = gql`
  mutation ($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const VERIFY_CODE = gql`
  mutation ($code: String!) {
    verifyCode(code: $code)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ($confirmPassword: String!, $newPassword: String!, $email: String!) {
    resetPassword(
      confirmPassword: $confirmPassword
      newPassword: $newPassword
      email: $email
    )
  }
`;
