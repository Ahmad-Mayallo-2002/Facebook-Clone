import { gql } from "@apollo/client";

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
