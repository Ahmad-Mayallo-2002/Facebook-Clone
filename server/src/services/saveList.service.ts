import { Service } from "typedi";
import { SaveList } from "../entities/saveList.entity";
import { paginationCalculation } from "../utils/paginationCalculation";
import { PaginatedData } from "../interfaces/pagination.interface";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { SaveItem } from "../entities/saveItem.entity";

@Service()
export class SaveListService {
  constructor(
    @InjectRepository() private saveListRepo: Repository<SaveList>,
    @InjectRepository() private saveItemRepo: Repository<SaveItem>,
  ) {}

  async getSaveLists(
    take: number,
    skip: number,
  ): Promise<PaginatedData<SaveList>> {
    const [data, counts] = await this.saveListRepo.findAndCount({ take, skip });
    if (!counts) throw new Error("No Save Lists Found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async getSaveListByUserId(userId: string): Promise<SaveList> {
    const saveList = await this.saveListRepo.findOneBy({ userId });
    if (!saveList) throw new Error("No Save List Found");
    return saveList;
  }

  async clearSaveList(userId: string): Promise<boolean> {
    await this.getSaveListByUserId(userId);
    this.saveItemRepo.delete(userId);
    return true;
  }

  async deleteSaveItem(id: string): Promise<boolean> {
    const saveItem = await this.saveItemRepo.findOneBy({ id });
    if (!saveItem) throw new Error("This Item Not Found");
    await this.saveItemRepo.remove(saveItem);
    return true;
  }

  async addToSaveItem(userId: string, postId: string): Promise<string> {
    let saveList = await this.getSaveListByUserId(userId);

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
    });
    await this.saveItemRepo.save(newItem);

    return 'This Post is Saved';
  }
}
