import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "../resolvers/auth.resolver";
import { UserResolver } from "../resolvers/user.resolver";
import { PostResolver } from "../resolvers/post.resolver";
import { CommentResolver } from "../resolvers/comment.resolver";
import { ReactResolver } from "../resolvers/react.resolver";
import { PageResolver } from "../resolvers/page.resolver";
import { ResolveTime } from "../middlewares/resolveTime.middleware";

export const resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver, PostResolver, CommentResolver, ReactResolver, PageResolver];

export const globalMiddlewares = [ResolveTime];