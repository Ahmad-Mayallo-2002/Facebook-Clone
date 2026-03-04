"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueRedis = exports.connectionOptions = void 0;
const dotenv_1 = require("dotenv");
const ioredis_1 = __importDefault(require("ioredis"));
(0, dotenv_1.config)();
const { REDIS_HOST, REDIS_PORT } = process.env;
exports.connectionOptions = {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    name: "facebook-clone",
};
exports.queueRedis = new ioredis_1.default(exports.connectionOptions);
