import { Service } from "typedi";
import { getRepo } from "../utils/getRepo";
import { React } from "../entities/react.entity";
import { Emotions } from "../enums/emotions.enum";
import { ReactType } from "../enums/reactType.enum";
import { PostService } from "./post.service";
import { CommentService } from "./comment.service";
import { UserService } from "./user.service";
import { PaginatedData } from "../interfaces/pagination.interface";
import { paginationCalculation } from "../utils/paginationCalculation";

@Service()
export class ReactService {
  private readonly reactRepo = getRepo(React);

  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
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

  async getCommentReacts(
    commentId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<React>> {
    await this.commentService.getById(commentId);
    const [reacts, counts] = await this.reactRepo.findAndCount({
      where: { commentId, type: ReactType.COMMENT },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!reacts.length) throw new Error("No reacts found for this comment");
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

  async getUserReactOnComment(userId: string, commentId: string) {
    const react = await this.reactRepo.findOne({
      where: { commentId, userId },
    });
    if (!react) throw new Error("No user react on this post");
    return react;
  }

  async addRreact(
    userId: string,
    value: Emotions,
    type: ReactType,
    postId: string,
  ): Promise<string> {
    const newReact = this.reactRepo.create({
      type,
      value,
      postId,
      userId,
      post: { id: postId },
      user: { id: userId },
    });
    await this.reactRepo.save(newReact);
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
