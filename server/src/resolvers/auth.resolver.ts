import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AuthService } from "../services/auth.service";
import { AuthInput, RegisterInput } from "../graphql/inputs/auth.input";
import { User } from "../entities/user.entity";
import { Context } from "../interfaces/context.interface";
import { Service } from "typedi";
import { Payload } from "../interfaces/payload.interface";
import { PayloadType } from "../graphql/objectTypes/payload";

@Service()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => User)
  async register(@Arg("input") input: RegisterInput): Promise<User> {
    return this.authService.register(input);
  }

  @Mutation(() => PayloadType)
  async login(
    @Arg("input") input: AuthInput,
    @Ctx() {session}: Context
  ): Promise<Payload> {
    const payload = await this.authService.login(input);
    session.user = payload;
    return payload;
  }

  @Mutation(() => String)
  async forgotPassword(@Arg("email") email: string): Promise<string> {
    try {
      return await this.authService.forgotPassword(email);
    } catch (error: any) {
      console.log(error);
      return error?.message;
    }
  }

  @Mutation(() => String)
  async verifyCode(@Arg("code") code: string): Promise<string> {
    return this.authService.verifyCode(code);
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("email") email: string,
    @Arg("newPassword") newPassword: string,
    @Arg("confirmPassword") confirmPassword: string,
  ): Promise<boolean> {
    return this.authService.resetPassword(email, newPassword, confirmPassword);
  }

  @Query(() => Boolean)
  async seedAdmin(): Promise<boolean> {
    return this.authService.seedAdmin();
  }
}

