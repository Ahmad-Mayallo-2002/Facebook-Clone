import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AuthService } from "../services/auth.service";
import { AuthInput, RegisterInput } from "../graphql/inputs/auth.input";
import { User } from "../entities/user.entity";
import { Context } from "../interfaces/context.interface";
import { Service } from "typedi";

@Service()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => User)
  async register(@Arg("input") input: RegisterInput): Promise<User> {
    return this.authService.register(input);
  }

  @Mutation(() => String)
  async login(
    @Arg("input") input: AuthInput,
    @Ctx() { res }: Context,
  ): Promise<string> {
    const token = await this.authService.login(input);

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60
    });

    return token;
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

