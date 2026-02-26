import { config } from "dotenv";
import Redis, { RedisOptions } from "ioredis";

config();

const { REDIS_HOST, REDIS_PORT } = process.env;

export const connectionOptions: RedisOptions = {
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  name: "facebook-clone",
};

export const queueRedis = new Redis(connectionOptions);
