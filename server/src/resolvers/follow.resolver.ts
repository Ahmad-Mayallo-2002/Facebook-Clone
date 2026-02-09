import {
  Arg,
  Authorized,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { Follow } from "../entities/follow.entity";
import { FollowService } from "../services/follow.service";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";
import { FollowPaginated } from "../graphql/objectTypes/followPaginated";

@UseMiddleware(CheckToken)
@Service()
@Resolver()
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Authorized(Roles.ADMIN)
  @Query(() => FollowPaginated)
  async getAllFollows(@Arg("take") take: number, @Arg("skip") skip: number) {
    return await this.followService.getAllFollows(take, skip);
  }

  @Authorized(Roles.ADMIN)
  @Query(() => Follow)
  async getFollow(@Arg("id") id: string) {
    return await this.followService.getById(id);
  }

  @Query(() => FollowPaginated)
  async getUserFollowers(
    @Arg("userId") userId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.followService.getUserFollowers(userId, take, skip);
  }

  @Query(() => FollowPaginated)
  async getUserFollowings(
    @Arg("userId") userId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.followService.getUserFollowings(userId, take, skip);
  }

  @Query(() => FollowPaginated)
  async getPageFollowers(
    @Arg("pageId") pageId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.followService.getPageFollowers(pageId, take, skip);
  }

  @Query(() => FollowPaginated)
  async getPageFollowings(
    @Arg("userId") userId: string,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
  ) {
    return await this.followService.getPageFollowings(userId, take, skip);
  }

  @Mutation(() => Follow)
  async addUserFollowing(
    @Arg("userId") userId: string,
    @Arg("targetId") targetId: string,
  ): Promise<Follow> {
    return await this.followService.addUserFollowing(userId, targetId);
  }

  @Mutation(() => Follow)
  async addPageFollowing(
    @Arg("userId") userId: string,
    @Arg("pageId") pageId: string,
  ): Promise<Follow> {
    return await this.followService.addPageFollowing(userId, pageId);
  }

  @Mutation(() => Boolean)
  async cancelFollowing(
    @Arg("userId") userId: string,
    @Arg("targetId") targetId: string,
  ) {
    return await this.followService.cancelFollowing(userId, targetId);
  }
}
