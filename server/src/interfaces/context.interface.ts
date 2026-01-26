import { Request, Response } from "express";
import { IPayload } from "./payload.interface";

export interface Context {
  user: IPayload;
  req: Request;
  res: Response;
  session: any;
  cookies: any;
}
