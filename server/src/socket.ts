// socket.ts
import { Server } from "socket.io";
import { createServer } from "http";
import { app, sessionMiddleware } from "./app";

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.engine.use(sessionMiddleware as any);

io.on("connection", (socket) => {
  const req = socket.request as any;
  if (req.session?.id) socket.join(req.session.id);
  console.log("User Connected:", socket.id);
  socket.on("disconnect", () => console.log("User Disconnected:", socket.id));
});
