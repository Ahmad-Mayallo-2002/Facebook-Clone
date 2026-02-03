import { log } from "console";
import { GraphQLResolveInfo } from "graphql";
import { MiddlewareFn, NextFn } from "type-graphql";

export const ResolveTime: MiddlewareFn = async (
  { info }: { info: GraphQLResolveInfo },
  next: NextFn,
) => {
  const { parentType: { name }, fieldName } = info;
  
  if (name !== "Query" && name !== "Mutation") return next();

  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  const object = {
    name: name,
    fieldName: fieldName,
    time: `${resolveTime}ms`,
  };
  log(object);
};
