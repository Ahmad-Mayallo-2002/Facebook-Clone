import { Service } from "typedi";
import { SaveList } from "../entities/saveList.entity";
import { paginationCalculation } from "../utils/paginationCalculation";
import { PaginatedData } from "../interfaces/pagination.interface";
import { Repository } from "typeorm";
import { SaveItem } from "../entities/saveItem.entity";
import { getRepo } from "../utils/getRepo";

@Service()
export class SaveListService {
  private saveListRepo: Repository<SaveList> = getRepo(SaveList);
  private saveItemRepo: Repository<SaveItem> = getRepo(SaveItem);

  async getSaveLists(
    take: number,
    skip: number,
  ): Promise<PaginatedData<SaveList>> {
    const [data, counts] = await this.saveListRepo.findAndCount({
      take,
      skip,
    });
    if (!counts) throw new Error("No Save Lists Found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async getUserSaveList(userId: string): Promise<SaveList> {
    const saveList = await this.saveListRepo.findOne({
      where: { userId },
    });
    if (!saveList) throw new Error("No Save List Found");
    return saveList;
  }

  async isSavedPost(postId: string, userId: string): Promise<boolean> {
    const isSaved = await this.saveItemRepo.findOneBy({
      postId,
      userId,
    });
    return !!isSaved;
  }

  async clearSaveList(userId: string): Promise<string> {
    await this.getUserSaveList(userId);
    this.saveItemRepo.delete(userId);
    return "This Save List is Empty Now";
  }

  async deleteSaveItem(postId: string, userId: string): Promise<string> {
    const saveItem = await this.saveItemRepo.findOneBy({ userId, postId });
    if (!saveItem) throw new Error("This Item Not Found");
    const res = await this.saveItemRepo.delete(saveItem);
    return "This Post is unsaved";
  }

  async addToSaveList(userId: string, postId: string): Promise<string> {
    let saveList = await this.saveListRepo.findOne({ where: { userId } });

    if (!saveList) {
      saveList = this.saveListRepo.create({ userId, user: { id: userId } });
      await this.saveListRepo.save(saveList);
    }

    const currentItem = await this.saveItemRepo.findOneBy({ postId });
    if (currentItem) throw new Error("This Post is already saved");

    const newItem = this.saveItemRepo.create({
      postId,
      post: { id: postId },
      save: saveList,
      saveListId: saveList.id,
      userId,
    });
    await this.saveItemRepo.save(newItem);

    return "This Post is Saved";
  }
}
