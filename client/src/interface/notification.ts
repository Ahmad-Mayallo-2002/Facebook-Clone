import { type User } from "./user";

export interface Notification {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  receiverId: string;
  receiver: string;
  senderId: string;
  sender: User;
}
