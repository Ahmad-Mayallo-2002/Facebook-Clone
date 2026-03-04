"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailWorker = void 0;
const bullmq_1 = require("bullmq");
const nodemailer_1 = require("../../utils/nodemailer");
const queue_redis_1 = require("../../redis/queue.redis");
exports.emailWorker = new bullmq_1.Worker('email-queue', async (job) => {
    const { email } = job.data;
    console.log(`Send Verification code to: ${email}`);
    const code = await (0, nodemailer_1.sendMail)(email);
    console.log(`Verification code sent to ${email}`);
    await queue_redis_1.queueRedis.set(code, email, 'EX', 600);
}, {
    connection: queue_redis_1.connectionOptions,
    concurrency: 5,
});
