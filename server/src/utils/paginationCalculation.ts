import { Pagination } from "../interfaces/pagination.interface";

interface calculationProps {
  counts: number;
  take: number;
  skip: number;
}

export function paginationCalculation({
  counts,
  take,
  skip,
}: calculationProps): Pagination {
  const totalPages = Math.ceil(counts / take);
  const currentPage = Math.floor(skip / take) + 1;
  
  if (currentPage > totalPages || skip === counts)
    throw new Error("Page not found");

  const pagination: Pagination = {
    currentPage,
    totalPages,
    next: currentPage < totalPages,
    prev: currentPage > 1,
  };

  return pagination;
}
