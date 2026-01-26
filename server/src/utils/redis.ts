import { error, log } from "console";
import { createClient } from "redis";

export const redisClient = createClient({
  url: `redis://127.0.0.1:6379`,
});

redisClient.on("error", (err) => error(`Redis Client Error, ${err}`));
redisClient.on("connect", () => log("Redis is connected"));

redisClient.connect();
