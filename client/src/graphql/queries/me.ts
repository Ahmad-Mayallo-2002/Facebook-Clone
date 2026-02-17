import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      id
      image {
        url
        public_id
      }
      banner {
        url
        public_id
      }
      username
      email
      gender
      description
    }
  }
`;
