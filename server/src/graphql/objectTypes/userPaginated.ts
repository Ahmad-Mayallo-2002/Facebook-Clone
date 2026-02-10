import { ObjectType } from "type-graphql";
import { User } from "../../entities/user.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

@ObjectType()
export class UserPaginated extends PaginatedResponse(User) {}
