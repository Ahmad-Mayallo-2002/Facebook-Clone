import {
  Arg,
  Authorized,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { SaveList } from "../entities/saveList.entity";
import { SaveListService } from "../services/saveList.service";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";

@UseMiddleware(CheckToken)
@Service()
@Resolver(() => SaveList)
export class SaveListResolver {
  constructor(private saveListService: SaveListService) {}

  @Authorized(Roles.ADMIN)
  @Query(() => [SaveList])
  async getSaveLists(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int) skip: number,
  ) {
    return await this.saveListService.getSaveLists(take, skip);
  }

  @Query(() => SaveList)
  async getSaveListByUserId(@Arg("userId", () => ID) userId: string) {
    return await this.saveListService.getSaveListByUserId(userId);
  }

  @Mutation(() => Boolean)
  async clearSaveList(@Arg("userId", () => ID) userId: string) {
    return await this.saveListService.clearSaveList(userId);
  }

  @Mutation(() => Boolean)
  async deleteSaveItem(@Arg("id", () => ID) id: string) {
    return await this.saveListService.deleteSaveItem(id);
  }

  @Mutation(() => String)
  async addToSaveItem(
    @Arg("userId", () => ID) userId: string,
    @Arg("postId", () => ID) postId: string,
  ) {
    return await this.saveListService.addToSaveItem(userId, postId);
  }
}
