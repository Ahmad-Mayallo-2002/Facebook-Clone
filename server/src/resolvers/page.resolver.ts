import {
  Arg,
  Authorized,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { Page } from "../entities/page.entity";
import { PageService } from "../services/page.service";
import { PageInput } from "../graphql/inputs/page.input";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { PagePaginated } from "../graphql/objectTypes/pagePaginated";

@UseMiddleware(CheckToken)
@Service()
@Resolver()
export class PageResolver {
  constructor(private readonly pageService: PageService) {}

  @Query(() => PagePaginated)
  async getAllPages(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number,
  ) {
    return await this.pageService.getAllPages(take, skip);
  }

  @Query(() => Page)
  async getPage(@Arg("id") id: string) {
    return await this.pageService.getById(id);
  }

  @Query(() => PagePaginated)
  async getUserPages(
    @Arg("userId") userId: string,
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number,
  ) {
    return await this.pageService.getUserPages(userId, take, skip);
  }

  @Mutation(() => Page)
  async createPage(
    @Arg("userId") userId: string,
    @Arg("input", () => PageInput) input: PageInput,
  ) {
    return await this.pageService.createPage(userId, input);
  }

  @Mutation(() => Page)
  async updatePage(
    @Arg("id") id: string,
    @Arg("input", () => PageInput) input: Partial<PageInput>,
  ) {
    return await this.pageService.updatePage(id, input);
  }

  @Mutation(() => Boolean)
  async deletePage(@Arg("id") id: string) {
    return await this.pageService.deletePage(id);
  }
}
