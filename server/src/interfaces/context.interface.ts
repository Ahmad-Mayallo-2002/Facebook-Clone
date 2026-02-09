import { Request, Response } from "express";
import { UserLoader, PostLoader } from "./loader.interface";

export interface Context extends UserLoader, PostLoader {
  user: any;
  req: Request;
  res: Response;
  session: any;
  cookies: any;
}
