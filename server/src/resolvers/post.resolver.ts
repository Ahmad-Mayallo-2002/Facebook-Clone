import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Post } from "../entities/post.entity";
import { PostService } from "../services/post.service";
import { CreatePostInput } from "../graphql/inputs/post.input";

@Service()
@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) { }

  @Query(() => [Post])
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Query(() => Post)
  async getPost(@Arg("id") id: string) {
    return await this.postService.getById(id);
  }

  @Query(() => [Post])
  async getUserPosts(@Arg("userId") userId: string) {
    return await this.postService.getUserPosts(userId);
  }

  @Query(() => [Post])
  async getPagePosts() {
    const [skip, take] = [0, 0];
    return (await this.postService.getPagePosts(skip, take)).posts;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("userId") userId: string,
    @Arg("input", () => CreatePostInput) input: CreatePostInput
  ) {
    return await this.postService.createPost(userId, input);
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: string,
    @Arg("input", () => CreatePostInput) input: Partial<CreatePostInput>
  ) {
    return await this.postService.updatePost(id, input);
  }

  @Mutation(() => Post)
  async hidePost(@Arg("id") id: string, @Arg("visibleStatus") visibleStatus: boolean) {
    return await this.postService.hidePost(id, visibleStatus);
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: string) {
    return await this.postService.deletePost(id);
  }
}
