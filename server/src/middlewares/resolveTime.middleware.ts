import { log } from "console";
import { GraphQLResolveInfo } from "graphql";
import { MiddlewareFn, NextFn } from "type-graphql";

export const ResolveTime: MiddlewareFn = async (
  { info }: { info: GraphQLResolveInfo },
  next: NextFn,
) => {
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  const object = {
    name: info.parentType.name,
    fieldName: info.fieldName,
    time: `${resolveTime}ms`,
  };
  log(object);
};
