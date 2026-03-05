import { Friends } from "../../entities/friends.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

export const FriendsPaginated = PaginatedResponse(Friends);