import { Arg, Authorized, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { UserInput } from "../graphql/inputs/user.input";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";

@UseMiddleware(CheckToken)
@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Query(() => User)
  async getUser(@Arg('id') id: string) {
    return await this.userService.getById(id);
  }

  @Mutation(() => User)
  async updateUser(@Arg('id') id: string, @Arg('input', () => UserInput) input: Partial<UserInput>) {
    return await this.userService.updateUser(id, input);
  }

  @Mutation(() => String)
  async deleteUser(@Arg('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Authorized(Roles.ADMIN)
  @Mutation(() => String)
  async activeUser(@Arg('id') id: string, @Arg('status') status: boolean) {
    return await this.userService.activeUser(id, status);
  }
}
