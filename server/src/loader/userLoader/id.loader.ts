import DataLoader from "dataloader";
import { User } from "../../entities/user.entity";
import { getRepo } from "../../utils/getRepo";
import { In } from "typeorm";

export const createIdsByUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const userRepo = getRepo(User);
    const users = await userRepo.find({
      where: { id: In(userIds) },
    });

    const userMap: Record<string, User> = {};
    users.forEach((u) => {
      userMap[u.id] = u;
    });

    return userIds.map((id) => userMap[id]);
  });
