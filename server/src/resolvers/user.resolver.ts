import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Service } from "typedi";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { UserInput } from "../graphql/inputs/user.input";
import { CheckToken } from "../middlewares/checkToken.middleware";
import { Roles } from "../enums/roles.enum";
import { Post } from "../entities/post.entity";
import { Context } from "../interfaces/context.interface";
import { Comment } from "../entities/comment.entity";
import { UserPaginated } from "../graphql/objectTypes/userPaginated";

@UseMiddleware(CheckToken)
@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserPaginated)
  async getAllUsers(@Arg("take") take: number, @Arg("skip") skip: number) {
    return await this.userService.getAll(take, skip);
  }

  @Query(() => User)
  async getUser(@Arg("id") id: string) {
    return await this.userService.getById(id);
  }

  @Query(() => User, { name: "me" })
  async me(@Ctx() { session }: Context): Promise<User> {
    if (!session.user) throw new Error("You are not login");
    return await this.userService.getById(session.user.id);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("input", () => UserInput) input: Partial<UserInput>,
  ) {
    return await this.userService.updateUser(id, input);
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: string) {
    return await this.userService.deleteUser(id);
  }

  @Authorized(Roles.ADMIN)
  @Mutation(() => String)
  async activeUser(@Arg("id") id: string, @Arg("status") status: boolean) {
    return await this.userService.activeUser(id, status);
  }

  // Field Resolvers for Data Loaders
  @FieldResolver(() => [Post])
  async posts(@Root() user: User, @Ctx() { postsByUserLoader }: Context) {
    return postsByUserLoader.load(user.id);
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() user: User, @Ctx() { commentsByUserLoader }: Context) {
    return commentsByUserLoader.load(user.id);
  }
}
