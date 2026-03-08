import type { FriendRequest } from "@/enums/friendRequest";
import type { IdDate } from "./IdDate";
import type { User } from "./user";

export interface Friends extends IdDate {
  senderId: string;
  receiverId: string;
  sender: User;
  receiver: User;
  status: FriendRequest;
}
