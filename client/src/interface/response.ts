import type { Roles } from "@/enums/roles";
import type { User } from "./user";
import type { Post } from "./post";
import type { PaginatedData } from "./pagination";
import type { Comment } from "./comment";
import type { React } from "./react";

export interface LoginRes {
  login: {
    id: string;
    role: Roles;
    token: string;
  };
}

export interface VerifyCodeRes {
  verifyCode: string;
}

export interface Me {
  me: User;
}

export interface GetPosts {
  getPosts: PaginatedData<Post>;
}

export interface CreateCommentRes {
  createComment: Post;
}

export interface GetPostComments {
  getPostComments: PaginatedData<Comment>;
}

export interface GetPostReacts {
  getPostReacts: PaginatedData<React>;
}