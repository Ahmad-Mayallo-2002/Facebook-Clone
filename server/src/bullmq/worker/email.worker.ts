import { Worker } from 'bullmq';
import { sendMail } from '../../utils/nodemailer';
import { connectionOptions, queueRedis } from '../../redis/queue.redis';

export const emailWorker = new Worker('email-queue', async (job) => {
    const { email } = job.data;
    console.log(`Send Verification code to: ${email}`);
    const code = await sendMail(email);
    console.log(`Verification code sent to ${email}`);
    await queueRedis.set(code, email, 'EX', 600);
}, {
    connection: connectionOptions,
    concurrency: 5,
});