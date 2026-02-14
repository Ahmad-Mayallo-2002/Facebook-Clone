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

export const ADD_REACT = gql`
  mutation ($postId: String!, $type: ReactType!, $value: Emotions!) {
    addReact(postId: $postId, type: $type, value: $value)
  }
`;

export const DELETE_REACT = gql`
  mutation ($reactId: String!) {
    deleteReact(id: $reactId)
  }
`;

export const UPDATE_REACT = gql`
  mutation ($value: Emotions!, $reactId: String!) {
    updateReact(value: $value, id: $reactId) {
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation ($input: CreatePostInput!, $userId: String!) {
    createPost(input: $input, userId: $userId) {
      id
    }
  }
`;

export const DELETE_POST = gql`
  mutation ($id: String!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation ($input: CreatePostInput!, $id: String!) {
    updatePost(input: $input, id: $id) {
      id
    }
  }
`;