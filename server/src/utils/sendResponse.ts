import { Response } from "express";
import { Pagination } from "../interfaces/pagination";

function sendResponse<T>(
  res: Response,
  data: T,
  status: number,
  pagination: Pagination = {
    prev: false,
    next: false,
    currentPage: 0,
    totalPages: 0,
  },
) {
  const result: Record<any, any> = { data };
  if (Array.isArray(data)) result.pagination = pagination;
  return res.status(status).json(result);
}

export default sendResponse;
