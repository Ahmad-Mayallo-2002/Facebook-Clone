"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeResourceWorker = void 0;
const bullmq_1 = require("bullmq");
const cloudinary_1 = require("cloudinary");
const queue_redis_1 = require("../../redis/queue.redis");
exports.removeResourceWorker = new bullmq_1.Worker("remove-resource-queue", async (job) => {
    const { public_ids } = job.data;
    console.log("Starting Removing Source");
    await cloudinary_1.v2.api.delete_resources(public_ids);
    console.log("Ending Removing Source");
}, {
    connection: queue_redis_1.connectionOptions,
    concurrency: 5,
});
