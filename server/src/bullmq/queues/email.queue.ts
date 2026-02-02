import { Queue } from "bullmq";
import { connectionOptions } from "../../redis/queue.redis";

export const emailQueue = new Queue('email-queue', {
    connection: connectionOptions,
})