import { Service } from "typedi";
import { Post } from "../entities/post.entity";
import { DeepPartial } from "typeorm";
import { CreatePostInput } from "../graphql/inputs/post.input";
import { UploaderContext } from "../utils/uploaderContext";
import { CloudinaryUploader } from "../utils/cloudinaryUploader";
import { MediaObject } from "../interfaces/mediaObject.interface";
import { UploadApiResponse, v2 } from "cloudinary";
import { getRepo } from "../utils/getRepo";
import { PaginatedData } from "../interfaces/pagination.interface";
import { paginationCalculation } from "../utils/paginationCalculation";

@Service()
export class PostService {
  private postRepo = getRepo<Post>(Post);

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

    const post = this.postRepo.create({
      userId,
      user: { id: userId },
      content: input.content?.trim(),
      media,
    });

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
      relations: {
        reacts: true,
      },
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
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!posts.length) throw new Error("No posts found for this user");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data: posts, pagination };
  }

  async updatePost(id: string, input: Partial<CreatePostInput>): Promise<Post> {
    const post = await this.getById(id);

    const files = input.media;

    const media: MediaObject[] = [];

    if (files && files.length) {
      const uploader = new UploaderContext(new CloudinaryUploader());
      for (const file of files) {
        const { public_id, secure_url: url } = (await uploader.performStrategy(
          await file,
        )) as UploadApiResponse;
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
    if (post.media.length)
      post.media.forEach(async (m) => await v2.uploader.destroy(m.public_id));
    await this.postRepo.remove(post);
    return true;
  }

  // async deleteUserPosts(userId: string): Promise<boolean> {
  //   const {data} = await this.getUserPosts(userId);
  //   await this.postRepo.remove(data);
  //   return true;
  // }
}
