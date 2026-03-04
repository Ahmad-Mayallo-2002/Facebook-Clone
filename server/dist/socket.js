"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.httpServer = void 0;
// socket.ts
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app_1 = require("./app");
exports.httpServer = (0, http_1.createServer)(app_1.app);
exports.io = new socket_io_1.Server(exports.httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});
exports.io.engine.use(app_1.sessionMiddleware);
exports.io.on("connection", (socket) => {
    const req = socket.request;
    if (req.session?.id)
        socket.join(req.session.id);
    console.log("User Connected:", socket.id);
    socket.on("disconnect", () => console.log("User Disconnected:", socket.id));
});
