import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "../resolvers/auth.resolver";
import { UserResolver } from "../resolvers/user.resolver";
import { ResolveTime } from "../middlewares/resolveTime.middleware";

export const resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver];

export const globalMiddlewares = [ResolveTime];