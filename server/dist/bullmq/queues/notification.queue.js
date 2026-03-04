"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationQueue = void 0;
const bullmq_1 = require("bullmq");
const queue_redis_1 = require("../../redis/queue.redis");
exports.notificationQueue = new bullmq_1.Queue("notification-queue", {
    connection: queue_redis_1.connectionOptions,
});
