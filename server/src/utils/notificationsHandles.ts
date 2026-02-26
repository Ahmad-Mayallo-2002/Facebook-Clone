import { Server } from "socket.io";
import { Notification } from "../entities/notification.entity";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { NotificationType } from "../enums/notification-type.enum";
import { io } from "../socket";

export async function handleCommentNotification(
  payload: any,
  notificationRepo: Repository<Notification>,
  userRepo: Repository<User>,
) {
  const { userId, postId, receiverId } = payload;

  console.log("Starting Creating Notification");
  const commenter = await userRepo.findOne({ where: { id: userId } });
  const createNotification = notificationRepo.create({
    content: `${commenter?.username} commented on your post`,
    receiverId,
    referenceId: postId,
    receiver: { id: receiverId },
    sender: { id: userId, image: commenter?.image },
    senderId: userId,
    type: NotificationType.COMMENT,
  });

  console.log("Save Notification To DB");
  const notification = await notificationRepo.save(createNotification);

  console.log("Send Notification By WebSocket");
  io.emit("notify_post_owner", notification);
}

export async function handleReactNotification(
  payload: any,
  notificationRepo: Repository<Notification>,
  userRepo: Repository<User>,
) {
  const { userId, reactId, receiverId } = payload;

  console.log("Starting Creating Notification");
  const commenter = await userRepo.findOne({ where: { id: userId } });
  const createNotification = notificationRepo.create({
    content: `${commenter?.username} reacted on your post`,
    receiverId,
    referenceId: reactId,
    receiver: { id: receiverId },
    sender: { id: userId, image: commenter?.image },
    senderId: userId,
    type: NotificationType.REACT,
  });

  console.log("Save Notification To DB");
  const notification = await notificationRepo.save(createNotification);

  console.log("Send Notification By WebSocket");
  io.emit("notify_post_owner", notification);
}
