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
    const { userId, receiverId } = payload;

    console.log("Starting Creating Notification");
    const sender = await userRepo.findOne({ where: { id: userId } });
    const createNotification = notificationRepo.create({
        content: `${sender?.username} sent you a friend request`,
        receiverId,
        referenceId: userId,
        receiver: { id: receiverId },
        sender: { id: userId, image: sender?.image },
        senderId: userId,
        type: NotificationType.FRIENDSHIP_REQUEST,
    });

    console.log("Save Notification To DB");
    const notification = await notificationRepo.save(createNotification);

    console.log("Send Notification By WebSocket");
    io.emit("notifiy_friendship_request", notification);
}

export async function handleFriendshipAcceptNotification(
    payload: any,
    notificationRepo: Repository<Notification>,
    userRepo: Repository<User>,
) {
    const { userId, receiverId } = payload;

    console.log("Starting Creating Notification");
    const sender = await userRepo.findOne({ where: { id: userId } });
    const createNotification = notificationRepo.create({
        content: `${sender?.username} accepted your friend request`,
        receiverId,
        referenceId: userId,
        receiver: { id: receiverId },
        sender: { id: userId, image: sender?.image },
        senderId: userId,
        type: NotificationType.FRIENDSHIP_ACCEPT,
    });

    console.log("Save Notification To DB");
    const notification = await notificationRepo.save(createNotification);

    console.log("Send Notification By WebSocket");
    io.emit("notifiy_friendship_accept", notification);
}

export async function handleFrienshipRejectNotification(
    payload: any,
    notificationRepo: Repository<Notification>,
    userRepo: Repository<User>,
) {
    const { userId, receiverId } = payload;

    console.log("Starting Creating Notification");
    const sender = await userRepo.findOne({ where: { id: userId } });
    const createNotification = notificationRepo.create({
        content: `${sender?.username} rejected your friend request`,
        receiverId,
        referenceId: userId,
        receiver: { id: receiverId },
        sender: { id: userId, image: sender?.image },
        senderId: userId,
        type: NotificationType.FRIENDSHIP_REJECT,
    });

    console.log("Save Notification To DB");
    const notification = await notificationRepo.save(createNotification);

    console.log("Send Notification By WebSocket");
    io.emit("notifiy_friendship_reject", notification);
}