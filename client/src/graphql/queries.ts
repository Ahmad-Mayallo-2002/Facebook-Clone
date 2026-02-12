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
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query ($skip: Float!, $take: Float!, $postId: String!) {
    getPostComments(skip: $skip, take: $take, postId: $postId) {
      data {
        id
        content
        media {
          url
          public_id
        }
        createdAt
        user {
          id
          username
          image {
            url
            public_id
          }
        }
      }
    }
  }
`;

export const GET_POST_REACTS = gql`
  query ($skip: Float!, $take: Float!, $postId: String!) {
    getPostReacts(skip: $skip, take: $take, postId: $postId) {
      data {
        id
        value
        user {
          id
          username
          image {
            url
            public_id
          }
        }
      }
    }
  }
`;

export const GET_USER_REACT_ON_POST = gql`
  query ($postId: String!) {
    getUserReactOnPost(postId: $postId) {
      id
      value
    }
  }
`;
