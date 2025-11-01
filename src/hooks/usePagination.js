// src/hooks/usePagination.js
import { useState } from "react";

const usePagination = (initialPage = 1, initialPageSize = 6) => {
  const [pageNo, setPageNo] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const nextPage = () => setPageNo((prev) => prev + 1);
  const prevPage = () => setPageNo((prev) => Math.max(prev - 1, 1));

  const goToPage = (page) => setPageNo(page);
  const changePageSize = (size) => {
    setPageSize(size);
    setPageNo(1); // reset to first page when size changes
  };

  return {
    pageNo,
    pageSize,
    setPageNo,
    setPageSize,
    nextPage,
    prevPage,
    goToPage,
    changePageSize,
  };
};

export default usePagination;
