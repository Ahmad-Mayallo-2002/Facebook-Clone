import { type User } from "./user";
import { type Page } from "./page";
import type { IdDate } from "./IdDate";

export interface Follow extends IdDate {
  followerId: string;
  followingUserId: string;
  followingPageId: string;
  followingUser: User;
  followingPage: Page;
  follower: User;
}
