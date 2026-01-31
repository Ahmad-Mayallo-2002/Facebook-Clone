import { Service } from "typedi";
import { Post } from "../entities/post.entity";
import { DeepPartial } from "typeorm";
import { CreatePostInput } from "../graphql/inputs/post.input";
import { paginationCalculation } from "../utils/paginationCalculation";
import { Pagination } from "../interfaces/pagination.interface";
import { UploaderContext } from "../utils/uploaderContext";
import { CloudinaryUploader } from "../utils/cloudinaryUploader";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { UploadApiResponse } from "cloudinary";
import { getRepo } from "../utils/getRepo";

const POST_RELATIONS = { relations: ["user"] };

@Service()
export class PostService {
    private postRepo = getRepo<Post>(Post);

    async createPost(userId: string, input: CreatePostInput): Promise<Post> {
        const files = await input.media;

        if (!input.content && (!files || !files.length))
            throw new Error("Post must contain text content or media");

        const media: MediaObject[] = [];

        if (files) {
            const uploader = new UploaderContext(new CloudinaryUploader());
            for (const file of files) {
                const { public_id, secure_url: url } = await uploader.performStrategy(file) as UploadApiResponse;;
                media.push({ public_id, url });
            }
        }

        const post = this.postRepo.create({
            userId,
            user: { id: userId },
            content: input.content?.trim() ?? "",
            media
        });

        return await this.postRepo.save(post);
    }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postRepo.find({
            ...POST_RELATIONS,
            where: { isVisible: true },
            order: { createdAt: "DESC" },
        });
        if (!posts.length) throw new Error("No posts found");
        return posts;
    }

    async getById(id: string): Promise<Post> {
        const post = await this.postRepo.findOne({
            where: { id },
            ...POST_RELATIONS,
        });
        if (!post) throw new Error("Post not found");
        return post;
    }

    async getUserPosts(userId: string): Promise<Post[]> {
        const posts = await this.postRepo.find({
            where: { userId, isVisible: true },
            ...POST_RELATIONS,
            order: { createdAt: "DESC" },
        });
        if (!posts.length) throw new Error("No posts found for this user");
        return posts;
    }

    async getPagePosts(skip: number, take: number): Promise<{
        posts: Post[];
        pagination: Pagination;
    }> {
        const [posts, count] = await this.postRepo.findAndCount({
            where: { isVisible: true },
            ...POST_RELATIONS,
            order: { createdAt: "DESC" },
            skip,
            take,
        });
        const pagination = paginationCalculation({ counts: count, take, skip });
        return { posts, pagination };
    }

    async updatePost(id: string, input: Partial<CreatePostInput>): Promise<Post> {
        const post = await this.getById(id);

        const files = await input.media;

        const media: MediaObject[] = [];

        if (files && files.length) {
            const uploader = new UploaderContext(new CloudinaryUploader());
            for (const file of files) {
                const { public_id, secure_url: url } = await uploader.performStrategy(file) as UploadApiResponse;;
                media.push({ public_id, url });
            }
        }

        const data: DeepPartial<Post> = { ...input, media };
        Object.assign(post, data);
        return await this.postRepo.save(post);
    }

    async hidePost(id: string, visibleStatus: boolean): Promise<Post> {
        const post = await this.getById(id);
        post.isVisible = visibleStatus;
        return await this.postRepo.save(post);
    }

    async deletePost(id: string): Promise<boolean> {
        const post = await this.getById(id);
        await this.postRepo.remove(post);
        return true;
    }
}
