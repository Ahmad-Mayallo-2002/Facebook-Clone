import { type User } from "./user";
import { type Page } from "./page";

export interface Follow {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  followerId: string;
  followingUserId: string;
  followingPageId: string;
  followingUser: User;
  followingPage: Page;
  follower: User;
}
