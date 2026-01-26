import { Query, Resolver } from "type-graphql";
import { UserService } from "../services/user.service";
import { Service } from "typedi";

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  publicQuery() {
    return `This is Public Query`;
  }
}
