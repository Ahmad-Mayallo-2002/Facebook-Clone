import { Queue } from "bullmq";
import { connectionOptions, queueRedis } from "../../redis/queue.redis";

export const emailQueue = new Queue('email-queue', {
    connection: connectionOptions,
})