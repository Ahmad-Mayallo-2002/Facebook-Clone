import DataLoader from "dataloader";
import { Post } from "../../entities/post.entity";
import { getRepo } from "../../utils/getRepo";
import { In } from "typeorm";

export const createSavedPostLoader = () =>
  new DataLoader<string, Post>(async (postIds: any) => {
    const postRepo = getRepo(Post);
    const posts = await postRepo.find({
      where: {
        id: In(postIds),
      },
    });

    const postMap = new Map(posts.map((p) => [p.id, p]));
    const arrPosts = postIds.map((id: string) => postMap.get(id));
    if (!arrPosts.length) throw new Error("Save List is Empty");
    return arrPosts;
  });
