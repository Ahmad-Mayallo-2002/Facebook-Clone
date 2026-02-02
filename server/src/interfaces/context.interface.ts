import { Request, Response } from "express";

export interface Context {
  user: any;
  req: Request;
  res: Response;
  session: any;
  cookies: any;
}
