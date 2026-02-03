import { AuthorizationError, MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Context } from "../interfaces/context.interface";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import { Service } from "typedi";
import { Payload } from "../interfaces/payload.interface";

config();

@Service()
export class CheckToken implements MiddlewareInterface<Context> {
    async use({ context: ctx }: ResolverData<Context>, next: NextFn) {
        const user: Payload = ctx.session.user;
        if (!user?.token) throw new AuthorizationError("No access token provided");
        try {
            verify(user?.token, process.env.ACCESS_TOKEN_SECRET!);
        } catch (err) {
            throw new AuthorizationError("Invalid token");
        }
        return next();
    }
}