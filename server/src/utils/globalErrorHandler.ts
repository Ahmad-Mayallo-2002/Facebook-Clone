import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

function globalErrorHandler(
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const err = error as AppError;
  const status: number = err.statusCode || 500;
  res.status(status).json(error);
}

export default globalErrorHandler;
