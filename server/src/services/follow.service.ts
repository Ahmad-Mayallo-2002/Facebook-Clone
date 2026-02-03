import { Service } from "typedi";
import { getRepo } from "../utils/getRepo";
import { Follow } from "../entities/follow.entity";
import { IsNull, Not } from "typeorm";
import { UserService } from "./user.service";
import { PageService } from "./page.service";

@Service()
export class FollowService {
    private readonly followRepo = getRepo(Follow);

    constructor(
        private readonly userService: UserService,
        private readonly pageService: PageService
    ) { }

    async getAllFollows(): Promise<Follow[]> {
        const follows = await this.followRepo.find({
            order: { createdAt: "DESC" },
        });
        if (!follows.length) throw new Error("No follows found");
        return follows;
    }

    async getById(id: string): Promise<Follow> {
        const follow = await this.followRepo.findOne({
            where: { id },
        });
        if (!follow) throw new Error("Follow not found");
        return follow;
    }

    async getUserFollowers(userId: string): Promise<Follow[]> {
        await this.userService.getById(userId);
        const follows = await this.followRepo.find({
            where: { followingUserId: userId },
            order: { createdAt: "DESC" },
        });
        if (!follows.length) throw new Error("No followers found for this user");
        return follows;
    }

    async getUserFollowings(userId: string): Promise<Follow[]> {
        await this.userService.getById(userId);
        const follows = await this.followRepo.find({
            where: { followerId: userId, followingUserId: Not(IsNull()) },
            order: { createdAt: "DESC" },
        });
        if (!follows.length) throw new Error("No user followings found");
        return follows;
    }

    async getPageFollowers(pageId: string): Promise<Follow[]> {
        await this.pageService.getById(pageId);
        const follows = await this.followRepo.find({
            where: { followingPageId: pageId },
            order: { createdAt: "DESC" },
        });
        if (!follows.length) throw new Error("No followers found for this page");
        return follows;
    }

    async getPageFollowings(userId: string): Promise<Follow[]> {
        await this.userService.getById(userId);
        const follows = await this.followRepo.find({
            where: { followerId: userId, followingPageId: Not(IsNull()) },
            order: { createdAt: "DESC" },
        });
        if (!follows.length) throw new Error("No page followings found");
        return follows;
    }

    async addUserFollowing(userId: string, targetId: string): Promise<Follow> {
        await this.userService.getById(targetId);
        if (userId === targetId) throw new Error('You cannot follow yourself');
        const newFollowing = this.followRepo.create({
            followerId: userId,
            follower: { id: userId },
            followingUserId: targetId,
            followingUser: { id: targetId }
        });
        return await this.followRepo.save(newFollowing);
    }

    async addPageFollowing(userId: string, pageId: string): Promise<Follow> {
        const page = await this.pageService.getById(pageId);
        if (page.userId === userId) throw new Error('You cannot follow your page');
        const newFollowing = this.followRepo.create({
            followerId: userId,
            follower: { id: userId },
            followingPageId: pageId,
            followingPage: { id: pageId }
        });
        return await this.followRepo.save(newFollowing);
    }

    async cancelFollowing(userId: string, targetId: string) {
        const following = await this.followRepo.findOne({
            where: [
                { followerId: userId, followingUserId: targetId },
                { followerId: userId, followingPageId: targetId }
            ]
        });
        if (!following) throw new Error('No following found');
        await this.followRepo.remove(following);
        return true;
    }
}