"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommentNotification = handleCommentNotification;
exports.handleReactNotification = handleReactNotification;
const notification_type_enum_1 = require("../enums/notification-type.enum");
const socket_1 = require("../socket");
async function handleCommentNotification(payload, notificationRepo, userRepo) {
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
        type: notification_type_enum_1.NotificationType.COMMENT,
    });
    console.log("Save Notification To DB");
    const notification = await notificationRepo.save(createNotification);
    console.log("Send Notification By WebSocket");
    socket_1.io.emit("notify_post_owner", notification);
}
async function handleReactNotification(payload, notificationRepo, userRepo) {
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
        type: notification_type_enum_1.NotificationType.REACT,
    });
    console.log("Save Notification To DB");
    const notification = await notificationRepo.save(createNotification);
    console.log("Send Notification By WebSocket");
    socket_1.io.emit("notify_post_owner", notification);
}
