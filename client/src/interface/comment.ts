import { type MediaObject } from "./mediaObject";
import { type User } from "./user";
import { type Post } from "./post";
import { type React } from "./react";

export interface Comment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  media: MediaObject[];
  isVisible: boolean;
  userId: string;
  postId: string;
  user?: User;
  post?: Post;
  reacts?: React[];
}
