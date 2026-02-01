import { Arg, Authorized, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { Comment } from "../entities/comment.entity";
import { CommentService } from "../services/comment.service";
import { CommentInput } from "../graphql/inputs/comment.input";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";

@UseMiddleware(CheckToken)
@Service()
@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Authorized(Roles.ADMIN)
  @Query(() => [Comment])
  async getAllComments() {
    return await this.commentService.getAllComments();
  }

  @Query(() => Comment)
  async getComment(@Arg("id") id: string) {
    return await this.commentService.getById(id);
  }

  @Query(() => [Comment])
  async getPostComments(@Arg("postId") postId: string) {
    return await this.commentService.getPostComments(postId);
  }

  @Query(() => [Comment])
  async getUserComments(@Arg("userId") userId: string) {
    return await this.commentService.getUserComments(userId);
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg("userId") userId: string,
    @Arg("postId") postId: string,
    @Arg("input", () => CommentInput) input: CommentInput
  ) {
    return await this.commentService.createComment(userId, postId, input);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg("id") id: string,
    @Arg("input", () => CommentInput) input: CommentInput
  ) {
    return await this.commentService.updateComment(id, input);
  }

  @Authorized(Roles.ADMIN)
  @Mutation(() => String)
  async hideComment(@Arg("id") id: string, @Arg("status") status: boolean) {
    return await this.commentService.hideComment(id, status);
  }

  @Mutation(() => Boolean)
  async deleteComment(@Arg("id") id: string) {
    return await this.commentService.deleteComment(id);
  }
}
