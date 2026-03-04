"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationWorker = void 0;
const bullmq_1 = require("bullmq");
const queue_redis_1 = require("../../redis/queue.redis");
const getRepo_1 = require("../../utils/getRepo");
const user_entity_1 = require("../../entities/user.entity");
const notification_entity_1 = require("../../entities/notification.entity");
const notification_type_enum_1 = require("../../enums/notification-type.enum");
const notificationsHandles_1 = require("../../utils/notificationsHandles");
exports.notificationWorker = new bullmq_1.Worker("notification-queue", async (job) => {
    const userRepo = (0, getRepo_1.getRepo)(user_entity_1.User);
    const notificationRepo = (0, getRepo_1.getRepo)(notification_entity_1.Notification);
    const { event, payload } = job.data;
    switch (event) {
        case notification_type_enum_1.NotificationType.COMMENT:
            await (0, notificationsHandles_1.handleCommentNotification)(payload, notificationRepo, userRepo);
            break;
        case notification_type_enum_1.NotificationType.REACT:
            await (0, notificationsHandles_1.handleReactNotification)(payload, notificationRepo, userRepo);
            break;
        default:
            console.log("Error Choice");
            break;
    }
}, {
    connection: queue_redis_1.connectionOptions,
    concurrency: 5,
});
