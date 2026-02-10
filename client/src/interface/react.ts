import { Emotions } from "../enums/emotions";
import { ReactType } from "../enums/reactType";
import { type User } from "./user";
import { type Post } from "./post";
import { type Comment } from "./comment";

export interface React {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  value: Emotions;
  type: ReactType;
  userId: string;
  postId?: string;
  commentId?: string;
  user?: User;
  post?: Post;
  comment?: Comment;
}
