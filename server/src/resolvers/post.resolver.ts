import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { Post } from "../entities/post.entity";
import { Page } from "../entities/page.entity";
import { PostService } from "../services/post.service";
import { PageService } from "../services/page.service";
import { CreatePostInput } from "../graphql/inputs/post.input";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";
import { Context } from "../interfaces/context.interface";
import { React } from "../entities/react.entity";
import { User } from "../entities/user.entity";
import { PostPaginated } from "../graphql/objectTypes/postPaginated";

@UseMiddleware(CheckToken)
@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly pageService: PageService,
  ) {}

  @Query(() => PostPaginated)
  async getPosts(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number,
  ) {
    return await this.postService.getPosts(take, skip);
  }

  @Query(() => PostPaginated)
  async getPagePosts(
    @Arg("pageId") pageId: string,
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number,
  ) {
    return await this.postService.getPagePosts(pageId, take, skip);
  }

  @Query(() => Post)
  async getPost(@Arg("id") id: string) {
    return await this.postService.getById(id);
  }

  @Query(() => PostPaginated)
  async getUserPosts(
    @Arg("userId") userId: string,
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number,
  ) {
    return await this.postService.getUserPosts(userId, take, skip);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("userId") userId: string,
    @Arg("input", () => CreatePostInput) input: CreatePostInput,
  ) {
    return await this.postService.createPost(userId, input);
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: string,
    @Arg("input", () => CreatePostInput) input: Partial<CreatePostInput>,
    @Ctx() { session }: Context,
  ) {
    // only original author or page owner can update
    const post = await this.postService.getById(id);
    const userId = session.user.id;
    if (post.userId !== userId) {
      if (post.pageId) {
        const page = await this.pageService.getById(post.pageId);
        if (page.userId !== userId) throw new Error("Not authorized");
      } else {
        throw new Error("Not authorized");
      }
    }
    return await this.postService.updatePost(id, input);
  }

  @Authorized(Roles.ADMIN)
  @Mutation(() => Post)
  async hidePost(
    @Arg("id") id: string,
    @Arg("visibleStatus") visibleStatus: boolean,
  ) {
    return await this.postService.hidePost(id, visibleStatus);
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: string, @Ctx() { session }: Context) {
    const post = await this.postService.getById(id);
    const userId = session.user.id;
    if (post.userId !== userId) {
      if (post.pageId) {
        const page = await this.pageService.getById(post.pageId);
        if (page.userId !== userId) throw new Error("Not authorized");
      } else {
        throw new Error("Not authorized");
      }
    }
    return await this.postService.deletePost(id);
  }

  // Field Resolver for Data Loader
  @FieldResolver(() => User)
  async user(@Root() post: Post, @Ctx() { idByUserLoader }: Context) {
    return await idByUserLoader.load(post.userId);
  }

  @FieldResolver(() => Page, { nullable: true })
  async page(@Root() post: Post) {
    if (!post.pageId) return null;
    return await this.pageService.getById(post.pageId);
  }
}
