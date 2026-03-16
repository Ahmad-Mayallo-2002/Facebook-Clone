// app.ts
import express from "express";
import cors from "cors";
import session from "express-session";
import { join } from "path";
import bodyParser from "body-parser";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { sessionStore } from "./redis/session.redis";

export const app = express();

app.use(express.static(join(__dirname, "./public")));
app.use(graphqlUploadExpress({ maxFileSize: 1_000_000_000, maxFiles: 20 }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

export const sessionMiddleware = session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET!,
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

app.use(sessionMiddleware);
