import { gql } from "@apollo/client";

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
