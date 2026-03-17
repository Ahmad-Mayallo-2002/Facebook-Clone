import { Repository } from "typeorm";
import { Notification } from "../../entities/notification.entity";
import { User } from "../../entities/user.entity";
import { NotificationType } from "../../enums/notification-type.enum";
import { io } from "../../socket";

export async function handleReactNotification(
  payload: any,
  notificationRepo: Repository<Notification>,
  userRepo: Repository<User>,
) {
  const { userId, reactId, receiverId, targetType } = payload;

  console.log("Starting Creating Notification");
  const commenter = await userRepo.findOne({ where: { id: userId } });
  const contentTarget = targetType === "COMMENT" ? "comment" : "post";
  const createNotification = notificationRepo.create({
    content: `${commenter?.username} reacted on your ${contentTarget}`,
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
  io.to(receiverId).emit("notify_post_owner", notification);
}
