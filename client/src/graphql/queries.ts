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
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($take: Float!, $skip: Float!) {
    getPosts(take: $take, skip: $skip) {
      pagination {
        prev
        next
        totalPages
        currentPage
      }
      data {
        id
        content
        media {
          url
          public_id
        }
        createdAt
        updatedAt
        # Author
        user {
          id
          username
          image {
            url
            public_id
          }
        }
        # Users Reacts
        reacts {
          id
          value
          user {
            id
            image {
              url
              public_id
            }
          }
        }
        # Users Comments
        comments {
          id
          content
          createdAt
          media {
            url
            public_id
          }
          # Comments Reacts
          reacts {
            id
            value
          }
          user {
            id
            image {
              url
              public_id
            }
            username
          }
        }
      }
    }
  }
`;
