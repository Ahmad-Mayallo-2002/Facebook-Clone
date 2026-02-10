import { createReactsByCommentLoader } from "../loader/commentLoader/react.loader";
import { createCommentsByPostLoader } from "../loader/postLoader/comment.loader";
import { createReactsByPostLoader } from "../loader/postLoader/react.loader";
import { createCommentByUserLoader } from "../loader/userLoader/comment.loader";
import { createIdsByUserLoader } from "../loader/userLoader/id.loader";
import { createPostsByUserLoader } from "../loader/userLoader/post.loader";

export interface UserLoader {
  postsByUserLoader: ReturnType<typeof createPostsByUserLoader>;
  commentsByUserLoader: ReturnType<typeof createCommentByUserLoader>;
  idByUserLoader: ReturnType<typeof createIdsByUserLoader>;
}

export const userLoader: UserLoader = {
  postsByUserLoader: createPostsByUserLoader(),
  commentsByUserLoader: createCommentByUserLoader(),
  idByUserLoader: createIdsByUserLoader(),
};

export interface PostLoader {
  commentsByPostLoader: ReturnType<typeof createCommentsByPostLoader>;
  reactsByPostLoader: ReturnType<typeof createReactsByPostLoader>;
}

export const postLoader: PostLoader = {
  commentsByPostLoader: createCommentsByPostLoader(),
  reactsByPostLoader: createReactsByPostLoader(),
};

export interface CommentLoader {
  reactsByCommentLoader: ReturnType<typeof createReactsByCommentLoader>;
}

export const commentLoader: CommentLoader = {
  reactsByCommentLoader: createReactsByCommentLoader(),
};
