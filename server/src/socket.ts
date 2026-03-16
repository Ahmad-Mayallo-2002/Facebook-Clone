// socket.ts
import { Server } from "socket.io";
import { createServer } from "http";
import { app, sessionMiddleware } from "./app";

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }, cookie: true
});

io.engine.use(sessionMiddleware as any);

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  if (userId) socket.join(userId);
  console.log("User Connected:", socket.id, "userId:", userId);
  socket.on("disconnect", () => console.log("User Disconnected:", socket.id));
});
