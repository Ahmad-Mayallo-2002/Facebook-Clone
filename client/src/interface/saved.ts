import type { IdDate } from "./IdDate";
import type { Post } from "./post";
import type { User } from "./user";

export interface SaveItem extends IdDate {
  postId: string;
  saveListId: string;
  userId: string;
  post: Post;
  save: SaveList;
}

export interface SaveList extends IdDate {
  userId: string;
  user: User;
  saveItems: SaveItem[];
}
