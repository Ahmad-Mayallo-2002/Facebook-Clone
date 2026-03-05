import { Arg, ID, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Service } from "typedi";
import { Friends } from "../entities/friends.entity";
import { FriendService } from "../services/friends.service";
import { PaginatedData } from "../interfaces/pagination.interface";
import { FriendsPaginated } from "../graphql/objectTypes/friendsPaginated";
import { FriendRequest } from "../enums/friendRequest.enum";
import { CheckToken } from "../middlewares/checkToken.middleware";

@UseMiddleware(CheckToken)
@Service()
@Resolver(() => Friends)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendService) {}

  @Query(() => FriendsPaginated)
  async getAllFriends(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
  ): Promise<PaginatedData<Friends>> {
    return await this.friendsService.getAllFriends(take, skip);
  }

  @Query(() => FriendsPaginated)
  async getUserFriends(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("userId", () => ID) userId: string,
  ) {
    return await this.friendsService.getUserFriends(take, skip, userId);
  }

  @Query(() => FriendsPaginated)
  async getSenderRequests(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("senderId", () => ID) senderId: string,
  ) {
    return await this.friendsService.getSenderRequests(take, skip, senderId);
  }

  @Query(() => FriendsPaginated)
  async getReceiverRequests(
    @Arg("take", () => Int) take: number,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("receiverId", () => ID) receiverId: string,
  ) {
    return await this.friendsService.getReceiverRequests(
      take,
      skip,
      receiverId,
    );
  }

  @Mutation(() => String)
  async sendFriendshipRequest(
    @Arg("senderId", () => ID) senderId: string,
    @Arg("receiverId", () => ID) receiverId: string,
  ) {
    return await this.friendsService.sendFriendshipRequest(
      senderId,
      receiverId,
    );
  }

  @Mutation(() => String)
  async acceptOrRejectFriendshipRequest(
    @Arg("senderId", () => ID) senderId: string,
    @Arg("receiverId", () => ID) receiverId: string,
    @Arg("status", () => FriendRequest) status: FriendRequest,
  ) {
    return await this.friendsService.acceptOrRejectFriendshipRequest(
      senderId,
      receiverId,
      status,
    );
  }
}
