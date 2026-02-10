import { type MediaObject } from "./mediaObject";
import { type User } from "./user";
import { type Follow } from "./follow";

export interface Page {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  image: MediaObject;
  banner: MediaObject;
  description: string;
  userId: string;
  user?: User;
  followers?: Follow[];
}
