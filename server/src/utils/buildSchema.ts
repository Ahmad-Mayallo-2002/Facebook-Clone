import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "../resolvers/auth.resolver";
import { UserResolver } from "../resolvers/user.resolver";
import { PostResolver } from "../resolvers/post.resolver";
import { CommentResolver } from "../resolvers/comment.resolver";
import { ReactResolver } from "../resolvers/react.resolver";
import { PageResolver } from "../resolvers/page.resolver";
import { FollowResolver } from "../resolvers/follow.resolver";
import { ResolveTime } from "../middlewares/resolveTime.middleware";

export const resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver, PostResolver, CommentResolver, ReactResolver, PageResolver, FollowResolver];

export const globalMiddlewares = [ResolveTime];