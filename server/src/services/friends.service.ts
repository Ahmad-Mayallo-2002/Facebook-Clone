import { Service } from "typedi";
import { Friends } from "../entities/friends.entity";
import { PaginatedData } from "../interfaces/pagination.interface";
import { paginationCalculation } from "../utils/paginationCalculation";
import { FriendRequest } from "../enums/friendRequest.enum";
import { getRepo } from "../utils/getRepo";
import { NotificationService } from "./notification.service";
import { NotificationType } from "../enums/notification-type.enum";

@Service()
export class FriendService {
  private friendsRepo = getRepo(Friends);
  constructor(private readonly notificationService: NotificationService) {}

  async getAllFriends(
    take: number,
    skip: number,
  ): Promise<PaginatedData<Friends>> {
    const [data, counts] = await this.friendsRepo.findAndCount({ take, skip });
    if (!counts) throw new Error("No Friends Found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async getUserFriends(
    take: number,
    skip: number,
    userId: string,
  ): Promise<PaginatedData<Friends>> {
    const [data, counts] = await this.friendsRepo.findAndCount({
      take,
      skip,
      where: [
        { receiverId: userId, status: FriendRequest.ACCEPTED },
        { senderId: userId, status: FriendRequest.ACCEPTED },
      ],
      relations: ["sender", "receiver"],
    });
    if (!counts) throw new Error("No Friends For This User");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async getSenderRequests(
    take: number,
    skip: number,
    senderId: string,
  ): Promise<PaginatedData<Friends>> {
    const [data, counts] = await this.friendsRepo.findAndCount({
      where: {
        senderId,
        status: FriendRequest.PENDING,
      },
      take,
      skip,
      relations: ["sender", "receiver"],
    });
    if (!counts) throw new Error("Not Sent Requests Found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async getReceiverRequests(take: number, skip: number, receiverId: string) {
    const [data, counts] = await this.friendsRepo.findAndCount({
      take,
      skip,
      where: {
        receiverId,
        status: FriendRequest.PENDING,
      },
      relations: ["sender", "receiver"],
    });
    if (!counts) throw new Error("No Pending Friendship Requests Found");
    const pagination = paginationCalculation({ counts, take, skip });
    return { data, pagination };
  }

  async sendFriendshipRequest(senderId: string, receiverId: string) {
    if (senderId === receiverId) throw new Error("You cannot friend yourself");

    const currentRequest = await this.friendsRepo.findOne({
      where: { receiverId, senderId },
    });
    if (currentRequest) throw new Error("This request is already exist");

    const newRequest = this.friendsRepo.create({
      receiverId,
      senderId,
      receiver: { id: receiverId },
      sender: { id: senderId },
    });

    await this.friendsRepo.save(newRequest);

    await this.notificationService.dispatch(
      NotificationType.FRIENDSHIP_REQUEST,
      {
        senderId,
        receiverId,
      },
    );
    return `Friendship Request Sent Successfully`;
  }

  async acceptOrRejectFriendshipRequest(
    senderId: string,
    receiverId: string,
    status: FriendRequest,
  ): Promise<string> {
    const request = await this.friendsRepo.findOne({
      where: { senderId, receiverId },
      relations: ["receiver"],
    });

    if (!request) throw new Error("No Friendship Request Found");
    request.status = status;
    await this.friendsRepo.save(request);

    const event =
      status === FriendRequest.ACCEPTED
        ? NotificationType.FRIENDSHIP_ACCEPT
        : NotificationType.FRIENDSHIP_REJECT;

    await this.notificationService.dispatch(event, {
      senderId: receiverId,
      receiverId: senderId,
    });

    return `${request.receiver.username} ${status.toLowerCase()} your friendship request`;
  }

  async cancelFriendship(friendshipId: string): Promise<string> {
    const request = await this.friendsRepo.findOne({
      where: { id: friendshipId },
    });

    if (!request) throw new Error("No Friendship Or Request Found");

    await this.friendsRepo.remove(request);

    await this.notificationService.dispatch(
      NotificationType.FRIENDSHIP_CANCEL,
      {
        senderId: request.senderId,
        receiverId: request.receiverId,
      },
    );

    return "Friendship cancelled successfully";
  }

  async isFriend(userId: string, friendId: string): Promise<boolean> {
    if (userId === friendId) return false;

    const friendship = await this.friendsRepo.findOne({
      where: [
        {
          senderId: userId,
          receiverId: friendId,
          status: FriendRequest.ACCEPTED,
        },
        {
          senderId: friendId,
          receiverId: userId,
          status: FriendRequest.ACCEPTED,
        },
      ],
    });

    return !!friendship;
  }

  async cancelFriendshipByUsers(
    userId: string,
    friendId: string,
  ): Promise<string> {
    const friendship = await this.friendsRepo.findOne({
      where: [
        {
          senderId: userId,
          receiverId: friendId,
          status: FriendRequest.ACCEPTED,
        },
        {
          senderId: friendId,
          receiverId: userId,
          status: FriendRequest.ACCEPTED,
        },
      ],
    });

    if (!friendship) throw new Error("No Friendship Found");

    await this.friendsRepo.remove(friendship);

    await this.notificationService.dispatch(
      NotificationType.FRIENDSHIP_CANCEL,
      {
        senderId: userId,
        receiverId: friendId,
      },
    );

    return "Friendship cancelled successfully";
  }
}
