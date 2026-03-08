import DataLoader from "dataloader";
import { SaveList } from "../../entities/saveList.entity";
import { getRepo } from "../../utils/getRepo";
import { In } from "typeorm";

export const createSaveListByUserLoader = () =>
  new DataLoader<string, SaveList[]>(async (userIds) => {
    const saveListRepo = getRepo(SaveList);
    const saveLists = await saveListRepo.find({
      where: {
        userId: In(userIds),
      },
    });

    const saveListMap: Record<string, SaveList[]> = {};

    userIds.forEach((id) => (saveListMap[id] = []));

    saveLists.forEach((saveList) =>
      saveListMap[saveList.userId].push(saveList),
    );

    return userIds.map((id) => saveListMap[id]);
  });
