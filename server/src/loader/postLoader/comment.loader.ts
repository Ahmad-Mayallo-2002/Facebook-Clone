import DataLoader from "dataloader";
import { Comment } from "../../entities/comment.entity";
import { getRepo } from "../../utils/getRepo";
import { In } from "typeorm";

export const createCommentsByPostLoader = () =>
  new DataLoader<string, Comment[]>(async (postIds) => {
    const commentRepo = getRepo(Comment);
    const comments = await commentRepo.find({
      where: {
        postId: In(postIds),
      },
    });

    const commentMap: Record<string, Comment[]> = {};

    postIds.forEach((id) => (commentMap[id] = []));

    comments.forEach((comment) => commentMap[comment.postId].push(comment));

    return postIds.map((id) => commentMap[id]);
  });
