import { AuthChecker } from "type-graphql";
import { type Context } from "../../interfaces/context.interface";

export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles,
) => {
  return true;
};
