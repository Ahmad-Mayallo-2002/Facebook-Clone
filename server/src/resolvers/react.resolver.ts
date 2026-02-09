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
import { React } from "../entities/react.entity";
import { ReactService } from "../services/react.service";
import { Emotions } from "../enums/emotions.enum";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Context } from "../interfaces/context.interface";
import { Roles } from "../enums/roles.enum";
import { User } from "../entities/user.entity";
import { ReactPaginated } from "../graphql/objectTypes/reactPaginated";

@Service()
@Resolver(() => React)
@UseMiddleware(CheckToken)
export class ReactResolver {
  constructor(private readonly reactService: ReactService) {}

  // @Authorized(Roles.ADMIN)
  @Query(() => ReactPaginated)
  async getAllReacts(@Arg("take") take: number, @Arg("skip") skip: number) {
    return await this.reactService.getAllReacts(take, skip);
  }

  // @Authorized(Roles.ADMIN)
  @Query(() => React)
  async getReact(@Arg("id") id: string) {
    return await this.reactService.getById(id);
  }

  @Query(() => ReactPaginated)
  async getUserReacts(
    @Arg("userId") userId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.reactService.getUserReacts(userId, take, skip);
  }

  @Query(() => ReactPaginated)
  async getPostReacts(
    @Arg("postId") postId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.reactService.getPostReacts(postId, take, skip);
  }

  @Query(() => ReactPaginated)
  async getCommentReacts(
    @Arg("commentId") commentId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.reactService.getCommentReacts(commentId, take, skip);
  }

  @Mutation(() => String)
  async addOrRemovePostReact(
    @Ctx() { req: { session } }: Context,
    @Arg("postId") postId: string,
    @Arg("value", () => Emotions) value: Emotions,
  ) {
    const userId = (session as any).user.id;
    return await this.reactService.addOrRemoveOrPostReact(
      userId,
      value,
      postId,
    );
  }

  @Mutation(() => String)
  async addOrRemoveCommentReact(
    @Ctx() { req: { session } }: Context,
    @Arg("commentId") commentId: string,
    @Arg("value", () => Emotions) value: Emotions,
  ) {
    const userId = (session as any).user.id;
    return await this.reactService.addOrRemoveOrCommentReact(
      userId,
      value,
      commentId,
    );
  }

  @Mutation(() => React)
  async updateReact(
    @Arg("id") id: string,
    @Arg("value", () => Emotions) value: Emotions,
  ) {
    return await this.reactService.updateReact(id, value);
  }

  @Authorized(Roles.ADMIN)
  @Mutation(() => Boolean)
  async deleteReact(@Arg("id") id: string) {
    return await this.reactService.deleteReact(id);
  }

  // Field Resolver for Data Loader
  @FieldResolver(() => User)
  async user(@Root() react: React, @Ctx() { idByUserLoader }: Context) {
    return await idByUserLoader.load(react.userId);
  }
}
