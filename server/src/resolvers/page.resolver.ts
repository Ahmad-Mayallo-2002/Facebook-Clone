import { Arg, Authorized, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { Page } from "../entities/page.entity";
import { PageService } from "../services/page.service";
import { PageInput } from "../graphql/inputs/page.input";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";

@UseMiddleware(CheckToken)
@Service()
@Resolver()
export class PageResolver {
    constructor(private readonly pageService: PageService) { }

    @Query(() => [Page])
    async getAllPages() {
        return await this.pageService.getAllPages();
    }

    @Query(() => Page)
    async getPage(@Arg("id") id: string) {
        return await this.pageService.getById(id);
    }

    @Query(() => [Page])
    async getUserPages(@Arg("userId") userId: string) {
        return await this.pageService.getUserPages(userId);
    }

    @Mutation(() => Page)
    async createPage(
        @Arg("userId") userId: string,
        @Arg("input", () => PageInput) input: PageInput
    ) {
        return await this.pageService.createPage(userId, input);
    }

    @Mutation(() => Page)
    async updatePage(
        @Arg("id") id: string,
        @Arg("input", () => PageInput) input: Partial<PageInput>
    ) {
        return await this.pageService.updatePage(id, input);
    }

    @Mutation(() => Boolean)
    async deletePage(@Arg("id") id: string) {
        return await this.pageService.deletePage(id);
    }
}
