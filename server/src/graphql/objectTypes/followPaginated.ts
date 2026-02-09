import { ObjectType } from "type-graphql";
import { Follow } from "../../entities/follow.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

@ObjectType()
export class FollowPaginated extends PaginatedResponse(Follow) {}
