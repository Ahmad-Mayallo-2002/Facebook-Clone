import { createReactsByCommentLoader } from "../loader/commentLoader/react.loader";
import { createCommentsByPostLoader } from "../loader/postLoader/comment.loader";
import { createReactsByPostLoader } from "../loader/postLoader/react.loader";
import { createSavedPostLoader } from "../loader/saveLoader/savedPost.loader";
import { createSaveItemsBySaveListLoader } from "../loader/saveLoader/saveItem.loader";
import { createCommentByUserLoader } from "../loader/userLoader/comment.loader";
import { createIdsByUserLoader } from "../loader/userLoader/id.loader";
import { createPostsByUserLoader } from "../loader/userLoader/post.loader";
import { createSaveListByUserLoader } from "../loader/userLoader/saveList.loader";

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

export interface SaveListLoader {
  saveListByUserLoader: ReturnType<typeof createSaveListByUserLoader>;
}

export const saveListLoader: SaveListLoader = {
  saveListByUserLoader: createSaveListByUserLoader(),
};

export interface SaveItemLoader {
  saveItemsBySaveListLoader: ReturnType<typeof createSaveItemsBySaveListLoader>;
  savedPostLoader: ReturnType<typeof createSavedPostLoader>;
}

export const saveItemLoader: SaveItemLoader = {
  saveItemsBySaveListLoader: createSaveItemsBySaveListLoader(),
  savedPostLoader: createSavedPostLoader(),
};
