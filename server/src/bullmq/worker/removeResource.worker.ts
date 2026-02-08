import { Worker } from "bullmq";
import { v2 } from "cloudinary";
import { connectionOptions } from "../../redis/queue.redis";

export const removeResourceWorker = new Worker(
  "remove-resource-queue",
  async (job) => {
    const { public_id } = job.data;

    console.log("Starting Removing Source");

    await v2.uploader.destroy(public_id);

    console.log("Ending Removing Source");
  },
  {
    connection: connectionOptions,
    concurrency: 5,
  },
);
