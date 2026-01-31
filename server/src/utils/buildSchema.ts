import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "../resolvers/auth.resolver";
import { UserResolver } from "../resolvers/user.resolver";
import { PostResolver } from "../resolvers/post.resolver";
import { ResolveTime } from "../middlewares/resolveTime.middleware";

export const resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver, PostResolver];

export const globalMiddlewares = [ResolveTime];