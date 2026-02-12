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

export const CREATE_COMMENT = gql`
  mutation ($input: CommentInput!, $postId: String!) {
    createComment(input: $input, postId: $postId) {
      id
    }
  }
`;

export const ADD_OR_REMOVE_POST_REACT = gql`
  mutation ($value: Emotions!, $postId: String!) {
    addOrRemovePostReact(value: $value, postId: $postId)
  }
`;

export const UPDATE_REACT = gql`
  mutation ($value: Emotions!, $reactId: String!) {
    updateReact(value: $value, id: $reactId) {
      id
    }
  }
`;
