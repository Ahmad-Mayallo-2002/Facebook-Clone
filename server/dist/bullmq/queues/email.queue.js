"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = void 0;
const bullmq_1 = require("bullmq");
const queue_redis_1 = require("../../redis/queue.redis");
exports.emailQueue = new bullmq_1.Queue('email-queue', {
    connection: queue_redis_1.connectionOptions,
});
