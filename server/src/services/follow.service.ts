import { Service } from "typedi";
import { getRepo } from "../utils/getRepo";
import { Follow } from "../entities/follow.entity";
import { IsNull, Not } from "typeorm";
import { UserService } from "./user.service";
import { PageService } from "./page.service";
import { PaginatedData } from "../interfaces/pagination.interface";
import { paginationCalculation } from "../utils/paginationCalculation";

@Service()
export class FollowService {
  private readonly followRepo = getRepo(Follow);

  constructor(
    private readonly userService: UserService,
    private readonly pageService: PageService,
  ) {}

  async getAllFollows(
    take: number,
    skip: number,
  ): Promise<PaginatedData<Follow>> {
    const [follows, counts] = await this.followRepo.findAndCount({
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!follows.length) throw new Error("No follows found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: follows, pagination };
  }

  async getById(id: string): Promise<Follow> {
    const follow = await this.followRepo.findOne({
      where: { id },
    });
    if (!follow) throw new Error("Follow not found");
    return follow;
  }

  async getUserFollowers(
    userId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Follow>> {
    await this.userService.getById(userId);
    const [follows, counts] = await this.followRepo.findAndCount({
      where: { followingUserId: userId },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!follows.length) throw new Error("No followers found for this user");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: follows, pagination };
  }

  async getUserFollowings(
    userId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Follow>> {
    await this.userService.getById(userId);
    const [follows, counts] = await this.followRepo.findAndCount({
      where: { followerId: userId, followingUserId: Not(IsNull()) },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!follows.length) throw new Error("No user followings found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: follows, pagination };
  }

  async getPageFollowers(
    pageId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Follow>> {
    await this.pageService.getById(pageId);
    const [follows, counts] = await this.followRepo.findAndCount({
      where: { followingPageId: pageId },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!follows.length) throw new Error("No followers found for this page");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: follows, pagination };
  }

  async getPageFollowings(
    userId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Follow>> {
    await this.userService.getById(userId);
    const [follows, counts] = await this.followRepo.findAndCount({
      where: { followerId: userId, followingPageId: Not(IsNull()) },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!follows.length) throw new Error("No page followings found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: follows, pagination };
  }

  async addUserFollowing(userId: string, targetId: string): Promise<Follow> {
    await this.userService.getById(targetId);
    if (userId === targetId) throw new Error("You cannot follow yourself");
    const newFollowing = this.followRepo.create({
      followerId: userId,
      follower: { id: userId },
      followingUserId: targetId,
      followingUser: { id: targetId },
    });
    return await this.followRepo.save(newFollowing);
  }

  async addPageFollowing(userId: string, pageId: string): Promise<Follow> {
    const page = await this.pageService.getById(pageId);
    if (page.userId === userId) throw new Error("You cannot follow your page");
    const newFollowing = this.followRepo.create({
      followerId: userId,
      follower: { id: userId },
      followingPageId: pageId,
      followingPage: { id: pageId },
    });
    return await this.followRepo.save(newFollowing);
  }

  async cancelFollowing(userId: string, targetId: string) {
    const following = await this.followRepo.findOne({
      where: [
        { followerId: userId, followingUserId: targetId },
        { followerId: userId, followingPageId: targetId },
      ],
    });
    if (!following) throw new Error("No following found");
    await this.followRepo.remove(following);
    return true;
  }
}
