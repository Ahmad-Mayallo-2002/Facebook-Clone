"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
require("reflect-metadata");
require("./bullmq/worker/email.worker");
require("./bullmq/worker/notification.worker");
const graphql_1 = require("./graphql");
const dataSource_1 = require("./dataSource");
(0, dotenv_1.config)();
async function bootstrap() {
    await (0, dataSource_1.connect)();
    const port = Number(process.env.PORT) || 3000;
    await (0, graphql_1.startServer)(port);
}
bootstrap();
