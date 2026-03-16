import { ObjectType } from "type-graphql";
import { Friends } from "../../entities/friends.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

@ObjectType()
export class FriendsPaginated extends PaginatedResponse(Friends) {};