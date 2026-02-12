export interface Pagination {
  prev: boolean;
  next: boolean;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: Pagination;
}
