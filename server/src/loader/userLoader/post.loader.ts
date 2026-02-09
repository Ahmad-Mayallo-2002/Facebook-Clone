import { In } from "typeorm";
import { Post } from "../../entities/post.entity";
import DataLoader from "dataloader";
import { getRepo } from "../../utils/getRepo";

export const createPostsByUserLoader = () =>
  new DataLoader<string, Post[]>(async (userIds) => {
    const postRepo = getRepo(Post);
    const posts = await postRepo.find({
      where: {
        userId: In(userIds as string[]),
      },
    });

    const postMap: Record<string, Post[]> = {};

    userIds.forEach((id) => (postMap[id] = []));

    posts.forEach((post) => postMap[post.userId].push(post));

    return userIds.map((id) => postMap[id]);
  });
