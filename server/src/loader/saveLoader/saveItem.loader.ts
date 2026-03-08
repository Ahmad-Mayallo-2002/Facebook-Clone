import DataLoader from "dataloader";
import { SaveItem } from "../../entities/saveItem.entity";
import { getRepo } from "../../utils/getRepo";
import { In } from "typeorm";

export const createSaveItemsBySaveListLoader = () =>
  new DataLoader<string, SaveItem[]>(async (saveListIds) => {
    const saveItemRepo = getRepo(SaveItem);
    const saveItems = await saveItemRepo.find({
      where: {
        saveListId: In(saveListIds),
      },
    });

    const saveItemMap: Record<string, SaveItem[]> = {};

    saveListIds.forEach((id) => (saveItemMap[id] = []));

    saveItems.forEach((saveItem) =>
      saveItemMap[saveItem.saveListId].push(saveItem),
    );

    return saveListIds.map((id) => saveItemMap[id]);
  });
