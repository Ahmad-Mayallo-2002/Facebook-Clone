import { AuthorizationError, MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Context } from "../interfaces/context.interface";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import { Service } from "typedi";

config();

@Service()
export class CheckToken implements MiddlewareInterface<Context> {
    async use({ context: { req } }: ResolverData<Context>, next: NextFn) {
        const token = req.cookies.accessToken;
        if (!token) throw new AuthorizationError("No access token provided");
        try {
            const user = verify(token, process.env.ACCESS_TOKEN_SECRET!);
            (req.session as any).user = user;
        } catch (err) {
            throw new AuthorizationError("Invalid token");
        }
        return next();
    }
}