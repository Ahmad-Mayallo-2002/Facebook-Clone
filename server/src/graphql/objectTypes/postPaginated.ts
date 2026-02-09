import { ObjectType } from "type-graphql";
import { Post } from "../../entities/post.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

@ObjectType()
export class PostPaginated extends PaginatedResponse(Post) {}