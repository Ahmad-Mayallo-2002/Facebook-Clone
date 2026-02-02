import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import { config } from "dotenv";

config();

const { REDIS_HOST, REDIS_PORT } = process.env;

export const client = createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

client.on("connect", () => console.log("Session Redis connected"));

client.on("error", console.error);

client.connect();

export const sessionStore = new RedisStore({ client, prefix: "sess:" });