import { Request, Response } from "express";
import {
  UserLoader,
  PostLoader,
  CommentLoader,
  SaveItemLoader,
  SaveListLoader,
} from "./loader.interface";

type Loaders = UserLoader &
  PostLoader &
  CommentLoader &
  SaveItemLoader &
  SaveListLoader;

export interface Context extends Loaders {
  user: any;
  req: Request;
  res: Response;
  session: any;
}
