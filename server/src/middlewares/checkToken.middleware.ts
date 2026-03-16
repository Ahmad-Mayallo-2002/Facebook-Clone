import {
  AuthorizationError,
  MiddlewareInterface,
  NextFn,
  ResolverData,
} from "type-graphql";
import { Context } from "../interfaces/context.interface";
import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
import { Service } from "typedi";

config({ quiet: true });

@Service()
export class CheckToken implements MiddlewareInterface<Context> {
  async use({ context: { session } }: ResolverData<Context>, next: NextFn) {
    if (!session?.user) throw new AuthorizationError("Not authenticated");

    const { accessToken, refreshToken, id, role } = session.user;

    try {
      verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    } catch {
      try {
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
        const newAccessToken = sign(
          { id, role },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: "20s" },
        );
        session.user.accessToken = newAccessToken;
      } catch {
        throw new AuthorizationError("Session expired. Please login again.");
      }
    }

    return next();
  }
}
