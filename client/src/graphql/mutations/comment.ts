import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation ($input: CommentInput!, $postId: String!) {
    createComment(input: $input, postId: $postId) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation ($id: String!) {
    deleteComment(id: $id)
  }
`;

export const UPDATE_COMMENT = gql`
  mutation ($input: CommentInput!, $id: String!) {
    updateComment(input: $input, id: $id) {
      id
    }
  }
`;