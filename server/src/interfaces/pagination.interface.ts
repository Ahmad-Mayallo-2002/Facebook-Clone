export interface Pagination {
  prev: boolean;
  next: boolean;
  currentPage: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: Pagination;
}