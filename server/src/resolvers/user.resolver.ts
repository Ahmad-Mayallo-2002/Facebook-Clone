import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";


@Service()
@Resolver()
export class UserResolver {
  @Query(() => String)
  publicQuery() {
    return `This is Public Query`;
  }
}
