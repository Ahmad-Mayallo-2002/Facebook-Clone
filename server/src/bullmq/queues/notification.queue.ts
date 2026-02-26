import { Queue } from "bullmq";
import { connectionOptions } from "../../redis/queue.redis";

export const notificationQueue = new Queue("notification-queue", {
  connection: connectionOptions,
});
