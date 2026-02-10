import { ObjectType } from "type-graphql";
import { Comment } from "../../entities/comment.entity";
import { PaginatedResponse } from "../../utils/paginatedResponse";

@ObjectType()
export class CommentPaginated extends PaginatedResponse(Comment) {}
