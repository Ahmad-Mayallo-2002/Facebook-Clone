import DataLoader from "dataloader";
import { Comment } from "../../entities/comment.entity";
import { getRepo } from "../../utils/getRepo";
import { In } from "typeorm";

export const createCommentByUserLoader = () =>
  new DataLoader<string, Comment[]>(async (userIds) => {
    const commentRepo = getRepo(Comment);
    const comments = await commentRepo.find({
      where: {
        userId: In(userIds),
      },
    });

    const commentMap: Record<string, Comment[]> = {};

    userIds.forEach((id) => (commentMap[id] = []));

    comments.forEach((comment) => commentMap[comment.userId].push(comment));

    return userIds.map((id) => commentMap[id]);
  });
