import { Service } from "typedi";
import { Post } from "../entities/post.entity";
import { DeepPartial, Raw } from "typeorm";
import { CreatePostInput } from "../graphql/inputs/post.input";
import { UploaderContext } from "../utils/uploaderContext";
import { CloudinaryUploader } from "../utils/cloudinaryUploader";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { UploadApiResponse } from "cloudinary";
import { getRepo } from "../utils/getRepo";
import { PaginatedData } from "../interfaces/pagination.interface";
import { paginationCalculation } from "../utils/paginationCalculation";
import { removeResourceQueue } from "../bullmq/queues/removeResource.queue";
import { PageService } from "./page.service";

@Service()
export class PostService {
  private postRepo = getRepo<Post>(Post);

  constructor(private readonly pageService: PageService) {}

  async createPost(userId: string, input: CreatePostInput): Promise<Post> {
    const files = input.media;

    if (!input.content && (!files || !files.length))
      throw new Error("Post must contain text content or media");

    const media: MediaObject[] = [];

    if (files) {
      const uploader = new UploaderContext(new CloudinaryUploader());
      for (const file of files) {
        const { public_id, secure_url: url } = (await uploader.performStrategy(
          await file,
        )) as UploadApiResponse;
        media.push({ public_id, url });
      }
    }

    const pageId = input.pageId;
    if (pageId) await this.pageService.getById(pageId);

    const postData: DeepPartial<Post> = {
      userId,
      user: { id: userId },
      content: input.content?.trim(),
      media,
    };
    if (pageId) {
      postData.pageId = pageId;
      postData.page = { id: pageId };
    }

    const post = this.postRepo.create(postData);

    return await this.postRepo.save(post);
  }

  async getPosts(take: number, skip: number): Promise<PaginatedData<Post>> {
    const [posts, counts] = await this.postRepo.findAndCount({
      where: { isVisible: true },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!posts.length) throw new Error("No posts found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: posts, pagination };
  }

  async getById(id: string): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id },
    });
    if (!post) throw new Error("Post not found");
    return post;
  }

  async getUserPosts(
    userId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Post>> {
    const [posts, counts] = await this.postRepo.findAndCount({
      where: { userId, isVisible: true },
      relations: { saveItems: true },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!posts.length) throw new Error("No posts found for this user");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: posts, pagination };
  }

  async searchPosts(
    take: number,
    skip: number,
    search: string,
  ): Promise<PaginatedData<Post>> {
    const [data, counts] = await this.postRepo.findAndCount({
      where: {
        content: Raw((alias) => `${alias} ~* :pattern`, { pattern: search }),
      },
      take,
      skip,
    });
    if (!counts) throw new Error("No posts found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async updatePost(id: string, input: Partial<CreatePostInput>): Promise<Post> {
    const post = await this.getById(id);
    const files = input.media;
    const media: MediaObject[] = [];

    if (files && files.length) {
      const public_ids = post.media.map((m) => m.public_id);
      removeResourceQueue.add("remove-post-media", { public_ids });
      const uploader = new UploaderContext(new CloudinaryUploader());
      for (const file of files) {
        const { public_id, secure_url: url } = (await uploader.performStrategy(
          await file,
        )) as UploadApiResponse;
        media.push({ public_id, url });
      }
    }

    const data: DeepPartial<Post> = {};

    if (input.content) data.content = input.content;
    if (media.length) data.media = media;
    if (input.pageId) data.pageId = input.pageId;

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
    if (post.media.length) {
      const public_ids = post.media.map((m) => m.public_id);
      removeResourceQueue.add("remove-post-media", { public_ids });
    }
    await this.postRepo.remove(post);
    return true;
  }

  async getPagePosts(
    pageId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Post>> {
    // validate page
    await this.pageService.getById(pageId);
    const [posts, counts] = await this.postRepo.findAndCount({
      where: { pageId, isVisible: true },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!posts.length) throw new Error("No posts found for this page");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: posts, pagination };
  }
}
