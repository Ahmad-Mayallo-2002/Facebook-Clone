import { Service } from "typedi";
import { getRepo } from "../utils/getRepo";
import { React } from "../entities/react.entity";
import { Emotions } from "../enums/emotions.enum";
import { ReactType } from "../enums/reactType.enum";
import { PostService } from "./post.service";
import { UserService } from "./user.service";
import { PaginatedData } from "../interfaces/pagination.interface";
import { paginationCalculation } from "../utils/paginationCalculation";
import { NotificationType } from "../enums/notification-type.enum";
import { NotificationService } from "./notification.service";

@Service()
export class ReactService {
  private readonly reactRepo = getRepo(React);

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  async getAllReacts(
    take: number,
    skip: number,
  ): Promise<PaginatedData<React>> {
    const [reacts, counts] = await this.reactRepo.findAndCount({
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!reacts.length) throw new Error("No reacts found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: reacts, pagination };
  }

  async getUserReacts(
    userId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<React>> {
    await this.userService.getById(userId);
    const [reacts, counts] = await this.reactRepo.findAndCount({
      where: { userId },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!reacts.length) throw new Error("No reacts found for this user");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: reacts, pagination };
  }

  async getPostReacts(
    postId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<React>> {
    await this.postService.getById(postId);
    const [reacts, counts] = await this.reactRepo.findAndCount({
      where: { postId, type: ReactType.POST },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!reacts.length) throw new Error("No reacts found for this post");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: reacts, pagination };
  }

  async getById(id: string): Promise<React> {
    const react = await this.reactRepo.findOne({
      where: { id },
    });
    if (!react) throw new Error("React not found");
    return react;
  }

  async getUserReactOnPost(userId: string, postId: string) {
    const react = await this.reactRepo.findOne({ where: { postId, userId } });
    if (!react) throw new Error("No user react on this post");
    return react;
  }

  async addRreact(
    userId: string,
    value: Emotions,
    type: ReactType,
    postId?: string,
  ): Promise<string> {
    if (type !== ReactType.POST)
      throw new Error("Only POST react is supported");
    if (!postId) throw new Error("postId is required for post reacts");

    await this.postService.getById(postId);
    const currentReact = await this.reactRepo.findOne({
      where: { postId, userId },
    });
    if (currentReact) throw new Error("You already reacted to this post");

    const newReact = this.reactRepo.create({
      type,
      value,
      postId,
      userId,
      post: { id: postId },
      user: { id: userId },
    });
    const react = await this.reactRepo.save(newReact);

    const post = await this.postService.getById(postId);
    if (post.userId !== userId)
      this.notificationService.dispatch(NotificationType.REACT, {
        userId,
        reactId: react.id,
        receiverId: post.userId,
      });

    return "New react added";
  }

  async updateReact(id: string, value: Emotions): Promise<React> {
    const react = await this.getById(id);
    react.value = value;
    return await this.reactRepo.save(react);
  }

  async deleteReact(id: string): Promise<boolean> {
    const react = await this.getById(id);
    await this.reactRepo.remove(react);
    return true;
  }
}
