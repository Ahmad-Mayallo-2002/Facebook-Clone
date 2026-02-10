import { Request, Response } from "express";
import { UserLoader, PostLoader, CommentLoader } from "./loader.interface";

export interface Context extends UserLoader, PostLoader, CommentLoader {
  user: any;
  req: Request;
  res: Response;
  session: any;
}
