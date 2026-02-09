import { AuthCheckerInterface, ResolverData } from "type-graphql";
import { type Context } from "../../interfaces/context.interface";
import { Roles } from "../../enums/roles.enum";
import { Service } from "typedi";
import { ForbiddenError } from "apollo-server-errors";

@Service()
export class AuthChecker implements AuthCheckerInterface<Context> {
  check(resolverData: ResolverData<Context>, roles: Roles[]): boolean | Promise<boolean> {
    const { args, context: { req }, info, root } = resolverData;
    const user = (req.session as any).user;

    if (!roles.includes(user.role)) throw new ForbiddenError('Access is denied');

    return true;
  }
}