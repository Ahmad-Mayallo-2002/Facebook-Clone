import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { Comment } from "../entities/comment.entity";
import { CommentService } from "../services/comment.service";
import { CommentInput } from "../graphql/inputs/comment.input";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";
import { User } from "../entities/user.entity";
import { Context } from "../interfaces/context.interface";
import { React } from "../entities/react.entity";
import { CommentPaginated } from "../graphql/objectTypes/commentPaginated";

@Service()
@Resolver(() => Comment)
@UseMiddleware(CheckToken)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Authorized(Roles.ADMIN)
  @Query(() => CommentPaginated)
  async getAllComments(@Arg("take") take: number, @Arg("skip") skip: number) {
    return await this.commentService.getAllComments(take, skip);
  }

  @Query(() => Comment)
  async getComment(@Arg("id") id: string) {
    return await this.commentService.getById(id);
  }

  @Query(() => CommentPaginated)
  async getPostComments(
    @Arg("postId") postId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.commentService.getPostComments(postId, take, skip);
  }

  @Query(() => CommentPaginated)
  async getUserComments(
    @Arg("userId") userId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.commentService.getUserComments(userId, take, skip);
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg("postId") postId: string,
    @Arg("input", () => CommentInput) input: CommentInput,
    @Ctx() { session }: Context,
  ) {
    return await this.commentService.createComment(
      session.user.id,
      postId,
      input,
    );
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg("id") id: string,
    @Arg("input", () => CommentInput) input: CommentInput,
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

  // Field Resolver for Data Loader
  @FieldResolver(() => User)
  async user(@Root() comment: Comment, @Ctx() { idByUserLoader }: Context) {
    return await idByUserLoader.load(comment.userId);
  }

  @FieldResolver(() => [React])
  async reacts(
    @Root() comment: Comment,
    @Ctx() { reactsByCommentLoader }: Context,
  ) {
    return await reactsByCommentLoader.load(comment.id);
  }
}
