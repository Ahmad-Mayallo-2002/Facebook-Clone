"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStore = exports.client = void 0;
const redis_1 = require("redis");
const connect_redis_1 = require("connect-redis");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const { REDIS_HOST, REDIS_PORT } = process.env;
exports.client = (0, redis_1.createClient)({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
exports.client.on("connect", () => console.log("Session Redis connected"));
exports.client.on("error", console.error);
exports.client.connect();
exports.sessionStore = new connect_redis_1.RedisStore({ client: exports.client, prefix: "sess:" });
