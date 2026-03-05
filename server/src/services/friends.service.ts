import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Friends } from "../entities/friends.entity";
import { PaginatedData } from "../interfaces/pagination.interface";
import { paginationCalculation } from "../utils/paginationCalculation";
import { FriendRequest } from "../enums/friendRequest.enum";

@Service()
export class FriendService {
  constructor(@InjectRepository() private friendsRepo: Repository<Friends>) {}

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
      where: [
        { receiverId: userId, status: FriendRequest.ACCEPTED },
        { senderId: userId, status: FriendRequest.ACCEPTED },
      ],
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
      take,
      skip,
      where: {
        senderId,
        status: FriendRequest.PENDING,
      },
    });
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
    });
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
    return `${newRequest.sender.username} send for you friendship request`;
  }

  async acceptOrRejectFriendshipRequest(
    senderId: string,
    receiverId: string,
    status: FriendRequest,
  ): Promise<string> {
    const request = await this.friendsRepo.findOne({
      where: { senderId, receiverId },
      relations: {
        receiver: true,
      },
      select: {
        receiver: {
          username: true,
        },
      },
    });

    if (!request) throw new Error("No Friendship Request Found");
    request.status = status;
    await this.friendsRepo.save(request);
    return `${request.receiver.username} ${status.toLowerCase()} your friendship request`;
  }
}
