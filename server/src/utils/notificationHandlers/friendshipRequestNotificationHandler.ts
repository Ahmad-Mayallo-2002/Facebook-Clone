import { Notification } from "../../entities/notification.entity";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { NotificationType } from "../../enums/notification-type.enum";
import { io } from "../../socket";

// Friendship Requests Notifications
export async function handleFriendshipRequestNotification(
  payload: any,
  notificationRepo: Repository<Notification>,
  userRepo: Repository<User>,
) {
    const { senderId, receiverId } = payload;
    
    console.log('Friendship Request Running');

  console.log("Starting Creating Notification");
  const sender = await userRepo.findOne({ where: { id: senderId } });
  const createNotification = notificationRepo.create({
    content: `${sender?.username} sent you a friend request`,
      receiverId,
    referenceId: senderId,
    receiver: { id: receiverId },
    sender: { id: senderId, image: sender?.image },
    senderId,
    type: NotificationType.FRIENDSHIP_REQUEST,
  });

  console.log("Save Notification To DB");
  const notification = await notificationRepo.save(createNotification);

  console.log("Send Notification By WebSocket");
    io.to(receiverId).emit("notify_post_owner", notification);
    
    console.log("receiverId: " + receiverId);
    console.log("senderId: " + senderId);
    
    
}

export async function handleFriendshipAcceptNotification(
  payload: any,
  notificationRepo: Repository<Notification>,
  userRepo: Repository<User>,
) {
  const { senderId, receiverId } = payload;

  console.log("Starting Creating Notification");
  const sender = await userRepo.findOne({ where: { id: senderId } });
  const createNotification = notificationRepo.create({
    content: `${sender?.username} accepted your friend request`,
    receiverId,
    referenceId: senderId,
    receiver: { id: receiverId },
    sender: { id: senderId, image: sender?.image },
    senderId,
    type: NotificationType.FRIENDSHIP_ACCEPT,
  });

  console.log("Save Notification To DB");
  const notification = await notificationRepo.save(createNotification);

  console.log("Send Notification By WebSocket");
  io.to(receiverId).emit("notify_post_owner", notification);
}

export async function handleFrienshipRejectNotification(
  payload: any,
  notificationRepo: Repository<Notification>,
  userRepo: Repository<User>,
) {
  const { senderId, receiverId } = payload;

  console.log("Starting Creating Notification");
  const sender = await userRepo.findOne({ where: { id: senderId } });
  const createNotification = notificationRepo.create({
    content: `${sender?.username} rejected your friend request`,
    receiverId,
    referenceId: senderId,
    receiver: { id: receiverId },
    sender: { id: senderId, image: sender?.image },
    senderId,
    type: NotificationType.FRIENDSHIP_REJECT,
  });

  console.log("Save Notification To DB");
  const notification = await notificationRepo.save(createNotification);

  console.log("Send Notification By WebSocket");
  io.to(receiverId).emit("notify_post_owner", notification);
}

export async function handleFriendshipCancelNotification(
  payload: any,
  notificationRepo: Repository<Notification>,
  userRepo: Repository<User>,
) {
  const { senderId, receiverId } = payload;

  console.log("Starting Creating Notification");
  const sender = await userRepo.findOne({ where: { id: senderId } });
  const createNotification = notificationRepo.create({
    content: `${sender?.username} cancelled friendship with you`,
    receiverId,
    referenceId: senderId,
    receiver: { id: receiverId },
    sender: { id: senderId, image: sender?.image },
    senderId,
    type: NotificationType.FRIENDSHIP_CANCEL,
  });

  console.log("Save Notification To DB");
  const notification = await notificationRepo.save(createNotification);

  console.log("Send Notification By WebSocket");
  io.to(receiverId).emit("notify_post_owner", notification);
}