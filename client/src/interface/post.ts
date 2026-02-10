import { type MediaObject } from "./mediaObject";
import { type User } from "./user";
import { type Comment } from "./comment";
import { type React } from "./react";

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  media: MediaObject[];
  isVisible: boolean;
  userId: string;
  user: User;
  comments: Comment[];
  reacts: React[];
}
