"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
exports.connect = connect;
const console_1 = require("console");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
require("reflect-metadata");
(0, dotenv_1.config)();
const { DB_PASSWORD, DB_NAME, DB_USERNAME, DB_PORT } = process.env;
exports.dataSource = new typeorm_1.DataSource({
    password: `${DB_PASSWORD}`,
    username: `${DB_USERNAME}`,
    database: `${DB_NAME}`,
    port: Number(DB_PORT),
    host: "localhost",
    type: `postgres`,
    synchronize: true,
    entities: ["src/entities/**/*.entity.ts"],
});
async function connect() {
    try {
        await exports.dataSource.initialize();
        (0, console_1.log)("Database connection is done");
    }
    catch (err) {
        (0, console_1.log)("Error in database connection", err);
    }
}
