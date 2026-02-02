import { Arg, Authorized, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { Follow } from "../entities/follow.entity";
import { FollowService } from "../services/follow.service";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";

@UseMiddleware(CheckToken)
@Service()
@Resolver()
export class FollowResolver {
    constructor(private readonly followService: FollowService) { }

    @Authorized(Roles.ADMIN)
    @Query(() => [Follow])
    async getAllFollows() {
        return await this.followService.getAllFollows();
    }

    @Query(() => Follow)
    async getFollow(@Arg("id") id: string) {
        return await this.followService.getById(id);
    }

    @Query(() => [Follow])
    async getUserFollowers(@Arg("userId") userId: string) {
        return await this.followService.getUserFollowers(userId);
    }

    @Query(() => [Follow])
    async getUserFollowings(@Arg("userId") userId: string) {
        return await this.followService.getUserFollowings(userId);
    }

    @Query(() => [Follow])
    async getPageFollowers(@Arg("pageId") pageId: string) {
        return await this.followService.getPageFollowers(pageId);
    }

    @Query(() => [Follow])
    async getPageFollowings(@Arg("userId") userId: string) {
        return await this.followService.getPageFollowings(userId);
    }

    @Mutation(() => Boolean)
    async cancelFollowing(@Arg('userId') userId: string, @Arg('targetId') targetId: string) {
        return await this.followService.cancelFollowing(userId, targetId);
    }
}
