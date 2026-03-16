import { registerEnumType } from "type-graphql";

export enum FriendRequest {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

registerEnumType(FriendRequest, {
  name: "FriendRequest",
  description: "Friend Request Enum",
});
