import type { IdDate } from "./IdDate";
import { type User } from "./user";

export interface Notification extends IdDate {
  content: string;
  receiverId: string;
  receiver: string;
  senderId: string;
  sender: User;
}
