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

@Service()
export class CommentService {
    private commentRepo = getRepo<Comment>(Comment);

    constructor(private readonly postService: PostService) { }

    async getAllComments(): Promise<Comment[]> {
        const comments = await this.commentRepo.find({
            order: { createdAt: "DESC" },
        });
        if (!comments.length) throw new Error("No comments found");
        return comments;
    }

    async getById(id: string): Promise<Comment> {
        const comment = await this.commentRepo.findOne({
            where: { id },
        });
        if (!comment) throw new Error("Comment not found");
        return comment;
    }

    async getPostComments(postId: string): Promise<Comment[]> {
        await this.postService.getById(postId);
        const comments = await this.commentRepo.find({
            where: { postId, isVisible: true },
            order: { createdAt: "DESC" },
        });
        if (!comments.length) throw new Error("No comments found for this post");
        return comments;
    }

    async getUserComments(userId: string): Promise<Comment[]> {
        const comments = await this.commentRepo.find({
            where: { userId, isVisible: true },
            order: { createdAt: "DESC" },
        });
        if (!comments.length) throw new Error("No comments found for this user");
        return comments;
    }

    async createComment(
        userId: string,
        postId: string,
        input: CommentInput
    ): Promise<Comment> {
        await this.postService.getById(postId);

        if (!input.content && (!input.media || !input.media?.length))
            throw new Error('Comment must contain text content or media');

        const files = input.media;
        const media: MediaObject[] = [];

        if (files?.length) {
            const uploader = new UploaderContext(new CloudinaryUploader());
            for (const file of files) {
                const { public_id, secure_url: url } =
                    (await uploader.performStrategy(await file)) as UploadApiResponse;
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

        return await this.commentRepo.save(comment);
    }

    async updateComment(id: string, input: CommentInput): Promise<Comment> {
        const comment = await this.getById(id);

        const files = input.media;
        const media: MediaObject[] = [];

        if (files?.length) {
            const uploader = new UploaderContext(new CloudinaryUploader());
            for (const file of files) {
                const { public_id, secure_url: url } =
                    (await uploader.performStrategy(await file)) as UploadApiResponse;
                media.push({ public_id, url });
            }
        }

        const data: DeepPartial<Comment> = {
            content: input.content,
            media
        };
        Object.assign(comment, data);
        return await this.commentRepo.save(comment);
    }

    async hideComment(id: string, status: boolean): Promise<string> {
        const comment = await this.getById(id);
        comment.isVisible = status;
        await this.commentRepo.save(comment);
        return `Comment now is ${status ? 'visible' : 'hidden'}`
    }

    async deleteComment(id: string): Promise<boolean> {
        const comment = await this.getById(id);
        await this.commentRepo.remove(comment);
        return true;
    }
}
