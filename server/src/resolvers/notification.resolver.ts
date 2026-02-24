import { Arg, Ctx, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { NotificationService } from "../services/notification.service";
import { PaginatedData } from "../interfaces/pagination.interface";
import { Notification } from "../entities/notification.entity";
import { PaginatedResponse } from "../utils/paginatedResponse";
import { NotificationInput } from "../graphql/inputs/notification.input";
import { Context } from "../interfaces/context.interface";

@Service()
@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => PaginatedResponse(Notification))
  async getNotifications(
    @Arg("take", () => Int)
    take: number,
    @Arg("skip", () => Int)
    skip: number,
  ): Promise<PaginatedData<Notification>> {
    return this.notificationService.getNotifications(take, skip);
  }

  @Query(() => PaginatedResponse(Notification))
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

  @Mutation(() => Boolean)
  async markNotificationAsRead(@Arg("id", () => ID) id: string) {
    return this.notificationService.markAsRead(id);
  }
}
