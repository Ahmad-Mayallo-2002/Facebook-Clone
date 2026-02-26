import { ObjectType } from "type-graphql";
import { PaginatedResponse } from "../../utils/paginatedResponse";
import { Notification } from "../../entities/notification.entity";

@ObjectType()
export class NotificationPaginated extends PaginatedResponse(Notification) {}