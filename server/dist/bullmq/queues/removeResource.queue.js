"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeResourceQueue = void 0;
const bullmq_1 = require("bullmq");
const queue_redis_1 = require("../../redis/queue.redis");
exports.removeResourceQueue = new bullmq_1.Queue('remove-resource-queue', {
    connection: queue_redis_1.connectionOptions
});
