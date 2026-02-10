import type { Roles } from "@/enums/roles";
import type { User } from "./user";
import type { Post } from "./post";
import type { Pagination } from "./pagination";

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
  getPosts: {
    data: Post[];
    pagination: Pagination;
  };
}
