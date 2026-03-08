import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { SaveList } from "../entities/saveList.entity";
import { SaveListService } from "../services/saveList.service";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";
import { SaveListPaginated } from "../graphql/objectTypes/saveListPaginated";
import { SaveItem } from "../entities/saveItem.entity";
import { Context } from "../interfaces/context.interface";
import { Post } from "../entities/post.entity";

@UseMiddleware(CheckToken)
@Service()
@Resolver(() => SaveList)
export class SaveListResolver {
  constructor(private saveListService: SaveListService) {}

  @Authorized(Roles.ADMIN)
  @Query(() => SaveListPaginated)
  async getSaveLists(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number,
  ) {
    return await this.saveListService.getSaveLists(take, skip);
  }

  @Query(() => SaveList)
  async getUserSaveList(@Arg("userId", () => ID) userId: string) {
    return await this.saveListService.getUserSaveList(userId);
  }

  @Query(() => Boolean)
  async isSaved(
    @Arg("userId", () => ID) userId: string,
    @Arg("postId", () => ID) postId: string,
  ) {
    return await this.saveListService.isSavedPost(postId, userId);
  }

  @Mutation(() => String)
  async clearSaveList(@Arg("userId", () => ID) userId: string) {
    return await this.saveListService.clearSaveList(userId);
  }

  @Mutation(() => String)
  async deleteSaveItem(
    @Arg("userId", () => ID) userId: string,
    @Arg("postId", () => ID) postId: string,
  ) {
    return await this.saveListService.deleteSaveItem(postId, userId);
  }

  @Mutation(() => String)
  async addToSaveList(
    @Arg("userId", () => ID) userId: string,
    @Arg("postId", () => ID) postId: string,
  ) {
    return await this.saveListService.addToSaveList(userId, postId);
  }

  // FieldResolver for Data Loader
  @FieldResolver(() => SaveItem)
  async saveItems(
    @Root() saveList: SaveList,
    @Ctx() { saveItemsBySaveListLoader }: Context,
  ) {
    return await saveItemsBySaveListLoader.load(saveList.id);
  }
}
