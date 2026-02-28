import { Worker } from "bullmq";
import { v2 } from "cloudinary";
import { connectionOptions } from "../../redis/queue.redis";

export const removeResourceWorker = new Worker(
  "remove-resource-queue",
  async (job) => {
    const { public_ids } = job.data;

    console.log("Starting Removing Source");

    await v2.api.delete_resources(public_ids);

    console.log("Ending Removing Source");
  },
  {
    connection: connectionOptions,
    concurrency: 5,
  },
);
