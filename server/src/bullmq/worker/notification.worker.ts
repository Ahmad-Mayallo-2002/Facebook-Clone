import { Worker } from "bullmq";
import { connectionOptions } from "../../redis/queue.redis";
import { getRepo } from "../../utils/getRepo";
import { User } from "../../entities/user.entity";
import { Notification } from "../../entities/notification.entity";
import { NotificationType } from "../../enums/notification-type.enum";
import { handleCommentNotification, handleReactNotification } from "../../utils/notificationsHandles";

export const notificationWorker = new Worker(
  "notification-queue",
  async (job) => {
    const userRepo = getRepo(User);
    const notificationRepo = getRepo(Notification);
    const { event, payload } = job.data;
    switch (event) {
      case NotificationType.COMMENT:
        await handleCommentNotification(payload, notificationRepo, userRepo);
        break;
      case NotificationType.REACT:
        await handleReactNotification(payload, notificationRepo, userRepo);
        break;
      default:
        console.log("Error Choice");
        break;
    }
  },
  {
    connection: connectionOptions,
    concurrency: 5,
  },
);
