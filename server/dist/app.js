"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = exports.app = void 0;
// app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = require("path");
const body_parser_1 = __importDefault(require("body-parser"));
const graphql_upload_ts_1 = require("graphql-upload-ts");
const session_redis_1 = require("./redis/session.redis");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.static((0, path_1.join)(__dirname, "./public")));
exports.app.use((0, graphql_upload_ts_1.graphqlUploadExpress)({ maxFileSize: 1000000000, maxFiles: 20 }));
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
}));
exports.sessionMiddleware = (0, express_session_1.default)({
    store: session_redis_1.sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "session",
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
});
exports.app.use(exports.sessionMiddleware);
