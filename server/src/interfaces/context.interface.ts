import { Request, Response } from "express";
import { UserLoader, PostLoader, CommentLoader } from "./loader.interface";
import { Server } from "socket.io";

export interface Context extends UserLoader, PostLoader, CommentLoader {
  user: any;
  req: Request;
  res: Response;
  session: any;
  io: Server;
}
