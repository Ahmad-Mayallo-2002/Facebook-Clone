import { Roles } from "../enums/roles";
import { Gender } from "../enums/gender";
import { type MediaObject } from "./mediaObject";
import { type Post } from "./post";
import { type Comment } from "./comment";
import { type React } from "./react";
import { type Page } from "./page";
import { type Notification } from "./notification";
import { type Follow } from "./follow";

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  description: string;
  role: Roles;
  image: MediaObject;
  banner: MediaObject;
  gender: Gender;
  isActive: boolean;
  posts?: Post[];
  comments?: Comment[];
  reacts?: React[];
  pages?: Page[];
  notifications?: Notification[];
  followers?: Follow[];
  followings?: Follow[];
}
