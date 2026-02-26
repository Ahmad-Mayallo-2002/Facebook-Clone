import { Worker } from "bullmq";
import { connectionOptions } from "../../redis/queue.redis";
import { getRepo } from "../../utils/getRepo";
import { User } from "../../entities/user.entity";
import { Notification } from "../../entities/notification.entity";

export const notificationWorker = new Worker(
  "notification-worker",
  async (job) => {
    const { userId, postId, receiverId } = job.data;
    const userRepo = getRepo(User);
    const notificationRepo = getRepo(Notification);

    const commenter = await userRepo.findOne({ where: { id: userId } });
    const createNotification = notificationRepo.create({
      content: `${commenter?.username} commented on your post`,
      receiverId,
      referenceId: postId,
      receiver: { id: receiverId },
      sender: { id: userId },
      senderId: userId,
    });
    await notificationRepo.save(createNotification);
  },
  {
    connection: connectionOptions,
    concurrency: 5,
  },
);
