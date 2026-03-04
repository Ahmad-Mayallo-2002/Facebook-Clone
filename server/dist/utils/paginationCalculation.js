"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationCalculation = paginationCalculation;
function paginationCalculation({ counts, take, skip, }) {
    const totalPages = Math.ceil(counts / take);
    const currentPage = Math.floor(skip / take) + 1;
    if (currentPage > totalPages)
        throw new Error("Page not found");
    const pagination = {
        currentPage,
        totalPages,
        next: currentPage < totalPages,
        prev: currentPage > 1,
    };
    return pagination;
}
