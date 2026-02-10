import DataLoader from "dataloader";
import { React } from "../../entities/react.entity";
import { getRepo } from "../../utils/getRepo";
import { In } from "typeorm";

export const createReactsByCommentLoader = () =>
  new DataLoader<string, React[]>(async (commentIds) => {
    const reactRepo = getRepo(React);

    const reacts = await reactRepo.find({
      where: {
        commentId: In(commentIds),
      },
    });

    const reactMap: Record<string, React[]> = {};

    commentIds.forEach((id) => (reactMap[id] = []));

    reacts.forEach((react) => {
      reactMap[react.commentId].push(react);
    });

    return commentIds.map((id) => reactMap[id]);
  });
