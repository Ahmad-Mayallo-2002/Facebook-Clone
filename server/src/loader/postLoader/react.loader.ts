import DataLoader from "dataloader";
import { React } from "../../entities/react.entity";
import { getRepo } from "../../utils/getRepo";
import { In } from "typeorm";

export const createReactsByPostLoader = () => new DataLoader<string, React[]>(
  async (postIds) => {
    const reactRepo = getRepo(React);
    const reacts = await reactRepo.find({
      where: {
        postId: In(postIds),
      },
    });

    const reactMap: Record<string, React[]> = {};

    postIds.forEach((id) => (reactMap[id] = []));

    reacts.forEach((react) => reactMap[react.postId].push(react));

    return postIds.map((id) => reactMap[id]);
  },
);
