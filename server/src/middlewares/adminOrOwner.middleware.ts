import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Context } from "../interfaces/context.interface";
import { Roles } from "../enums/roles.enum";
import { ForbiddenError } from 'apollo-server-errors';

export class AdminOrOwner implements MiddlewareInterface<Context> {
    use({ context: { req }, args, info }: ResolverData<Context>, next: NextFn) {
        const user = (req.session as any).user;
        if (user.role === Roles.ADMIN && user.id === args.id) return next();
        else throw new ForbiddenError('Access is denied');
    }
}