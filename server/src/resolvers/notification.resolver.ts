import {
  Arg,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { NotificationService } from "../services/notification.service";
import { PaginatedData } from "../interfaces/pagination.interface";
import { Notification } from "../entities/notification.entity";
import { NotificationInput } from "../graphql/inputs/notification.input";
import { Context } from "../interfaces/context.interface";
import { User } from "../entities/user.entity";
import { NotificationPaginated } from "../graphql/objectTypes/notificationPaginated";

@Service()
@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => NotificationPaginated)
  async getNotifications(
    @Arg("take", () => Int)
    take: number,
    @Arg("skip", () => Int)
    skip: number,
  ): Promise<PaginatedData<Notification>> {
    return this.notificationService.getNotifications(take, skip);
  }

  @Query(() => NotificationPaginated)
  async getReceiverNotifications(
    @Arg("take", () => Int)
    take: number,
    @Arg("skip", () => Int)
    skip: number,
    @Ctx() { session }: Context,
  ): Promise<PaginatedData<Notification>> {
    return this.notificationService.getReceiverNotifications(
      session.userId,
      take,
      skip,
    );
  }

  @Query(() => Notification)
  async getById(@Arg("id", () => ID) id: string): Promise<Notification> {
    return this.notificationService.getById(id);
  }

  @Mutation(() => Boolean)
  async deleteNotification(@Arg("id", () => ID) id: string): Promise<boolean> {
    return this.notificationService.deleteNotification(id);
  }

  @Mutation(() => Notification)
  async createNotification(
    @Arg("input", () => NotificationInput)
    input: NotificationInput,
    @Ctx() { session }: Context,
  ) {
    const notification = await this.notificationService.createNotification(
      input,
      session.userId,
    );

    return notification;
  }

  // Field Resolvers for Data Loader
  @FieldResolver(() => User)
  async sender(
    @Root() notification: Notification,
    @Ctx() { idByUserLoader }: Context,
  ) {
    return await idByUserLoader.load(notification.senderId);
  }

  @FieldResolver(() => User)
  async receiver(
    @Root() notification: Notification,
    @Ctx() { idByUserLoader }: Context,
  ) {
    return await idByUserLoader.load(notification.receiverId);
  }
}
