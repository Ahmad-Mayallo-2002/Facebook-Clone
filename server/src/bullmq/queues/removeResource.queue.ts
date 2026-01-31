import { Queue } from 'bullmq';
import { connectionOptions } from "../../redis/queue.redis";

export const removeResourceQueue = new Queue('remove-resource-queue', {
    connection: connectionOptions
});