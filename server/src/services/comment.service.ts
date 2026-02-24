import { Service } from "typedi";
import { getRepo } from "../utils/getRepo";
import { Comment } from "../entities/comment.entity";
import { PostService } from "./post.service";
import { CommentInput } from "../graphql/inputs/comment.input";
import { DeepPartial } from "typeorm";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { UploaderContext } from "../utils/uploaderContext";
import { CloudinaryUploader } from "../utils/cloudinaryUploader";
import { UploadApiResponse } from "cloudinary";
import { PaginatedData } from "../interfaces/pagination.interface";
import { paginationCalculation } from "../utils/paginationCalculation";
import { v2 } from "cloudinary";
import { NotificationService } from "./notification.service";
import { UserService } from "./user.service";
import { NotificationType } from "../enums/notification-type.enum";
import { Post } from "../entities/post.entity";

@Service()
export class CommentService {
  private commentRepo = getRepo<Comment>(Comment);

  constructor(
    private readonly postService: PostService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  async getAllComments(
    take: number,
    skip: number,
  ): Promise<PaginatedData<Comment>> {
    const [data, counts] = await this.commentRepo.findAndCount({
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!data.length) throw new Error("No comments found");
    const pagination = paginationCalculation({ counts, skip, take });
    return { data, pagination };
  }

  async getById(id: string): Promise<Comment> {
    const comment = await this.commentRepo.findOne({
      where: { id },
    });
    if (!comment) throw new Error("Comment not found");
    return comment;
  }

  async getPostComments(
    postId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Comment>> {
    await this.postService.getById(postId);
    const [data, counts] = await this.commentRepo.findAndCount({
      where: { postId, isVisible: true },
      order: { createdAt: "desc" },
      take,
      skip,
    });
    if (!data.length) throw new Error("No comments found for this post");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async getUserComments(
    userId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Comment>> {
    const [data, counts] = await this.commentRepo.findAndCount({
      where: { userId, isVisible: true },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!data.length) throw new Error("No comments found for this user");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async createComment(
    userId: string,
    postId: string,
    input: CommentInput,
  ): Promise<{comment: Comment, post: Post}> {
    const post = await this.postService.getById(postId);

    if (!input.content && (!input.media || !input.media?.length))
      throw new Error("Comment must contain text content or media");

    const files = input.media;
    const media: MediaObject[] = [];

    if (files?.length) {
      const uploader = new UploaderContext(new CloudinaryUploader());
      for (const file of files) {
        const { public_id, secure_url: url } = (await uploader.performStrategy(
          await file,
        )) as UploadApiResponse;
        media.push({ public_id, url });
      }
    }

    const comment = this.commentRepo.create({
      userId,
      user: { id: userId },
      postId,
      post: { id: postId },
      content: input.content!.trim(),
      media,
    });

    const savedComment = await this.commentRepo.save(comment);

    if (post.userId !== userId) {
      const commenter = await this.userService.getById(userId);
      await this.notificationService.createNotification(
        {
          content: `${commenter.username} commented on your post`,
          type: NotificationType.COMMENT,
          receiverId: post.userId,
          referenceId: postId,
        },
        userId,
      );
    }

    return {comment: savedComment, post};
  }

  async updateComment(id: string, input: CommentInput): Promise<Comment> {
    const comment = await this.getById(id);

    const files = input.media;
    const media: MediaObject[] = [];

    if (files?.length) {
      const uploader = new UploaderContext(new CloudinaryUploader());
      for (const file of files) {
        const { public_id, secure_url: url } = (await uploader.performStrategy(
          await file,
        )) as UploadApiResponse;
        media.push({ public_id, url });
      }
    }

    const data: DeepPartial<Comment> = {};

    if (input.content) data.content = input.content;
    if (media.length) data.media = media;

    Object.assign(comment, data);
    return await this.commentRepo.save(comment);
  }

  async hideComment(id: string, status: boolean): Promise<string> {
    const comment = await this.getById(id);
    comment.isVisible = status;
    await this.commentRepo.save(comment);
    return `Comment now is ${status ? "visible" : "hidden"}`;
  }

  async deleteComment(id: string): Promise<boolean> {
    const comment = await this.getById(id);
    if (comment.media.length)
      comment.media.forEach(
        async (m) => await v2.uploader.destroy(m.public_id),
      );
    await this.commentRepo.remove(comment);
    return true;
  }
}
