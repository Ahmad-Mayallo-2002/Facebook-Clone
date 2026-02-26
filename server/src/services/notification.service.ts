import { Service } from "typedi";
import { getRepo } from "../utils/getRepo";
import { Notification } from "../entities/notification.entity";
import { NotificationInput } from "../graphql/inputs/notification.input";
import { paginationCalculation } from "../utils/paginationCalculation";
import { PaginatedData } from "../interfaces/pagination.interface";

@Service()
export class NotificationService {
  private readonly notificationRepo = getRepo(Notification);

  async createNotification(
    input: NotificationInput,
    senderId: string,
  ): Promise<Notification> {
    const notification = this.notificationRepo.create({
      ...input,
      sender: { id: senderId },
      receiver: { id: input.receiverId },
      senderId,
      receiverId: input.receiverId,
    });
    return await this.notificationRepo.save(notification);
  }

  async getNotifications(
    take: number,
    skip: number,
  ): Promise<PaginatedData<Notification>> {
    const [data, counts] = await this.notificationRepo.findAndCount({
      take,
      skip,
    });
    const pagination = paginationCalculation({ counts, take, skip });
    if (!data.length) throw new Error("No Notifications Found");
    return { data: data, pagination };
  }

  async getById(id: string): Promise<Notification> {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new Error("No Notification Found");
    return notification;
  }

  async getReceiverNotifications(
    receiverId: string,
    take: number,
    skip: number,
  ): Promise<PaginatedData<Notification>> {
    const [data, counts] = await this.notificationRepo.findAndCount({
      where: { receiverId },
      order: { createdAt: "DESC" },
      take,
      skip,
    });
    if (!data.length) throw new Error("No Notifications found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async deleteNotification(id: string): Promise<boolean> {
    const notification = await this.getById(id);
    await this.notificationRepo.remove(notification);
    return true;
  }

  async markAsRead(id: string): Promise<boolean> {
    await this.notificationRepo.update(id, { isRead: true });
    return true;
  }
}
