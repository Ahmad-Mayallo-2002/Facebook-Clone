import { type MediaObject } from "./mediaObject";
import { type User } from "./user";
import { type Follow } from "./follow";
import type { IdDate } from "./IdDate";

export interface Page extends IdDate {
  image: MediaObject;
  banner: MediaObject;
  description: string;
  userId: string;
  user?: User;
  followers?: Follow[];
}
