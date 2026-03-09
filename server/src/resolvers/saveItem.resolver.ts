import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { SaveItem } from "../entities/saveItem.entity";
import { Post } from "../entities/post.entity";
import { Context } from "../interfaces/context.interface";

@Service()
@Resolver(() => SaveItem)
export class SaveItemResolver {
  @FieldResolver(() => Post)
  async post(@Root() saveItem: SaveItem, @Ctx() { savedPostLoader }: Context) {
    return await savedPostLoader.load(saveItem.postId);
  }
}
