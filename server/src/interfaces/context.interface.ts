import { Request, Response } from "express";
import {
  UserLoader,
  PostLoader,
  SaveItemLoader,
  SaveListLoader,
} from "./loader.interface";

type Loaders = UserLoader &
  PostLoader &
  SaveItemLoader &
  SaveListLoader;

export interface Context extends Loaders {
  user: any;
  req: Request;
  res: Response;
  session: any;
}
