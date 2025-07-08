import React from "react";

const Pagination = ({ pageSize, setPageSize, currentPage, setCurrentPage, totalPages, pageSizeOptions }) => {
  const getVisiblePages = () => {
    const visiblePages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
    } else {
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-container">
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setCurrentPage(1); // Reset to first page when pageSize changes
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size} / Page
          </option>
        ))}
      </select>

      <div className="page-buttons">
        <button
          className="page-btn"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {visiblePages.map((p, idx) => (
          <button
            key={idx}
            className={`page-btn ${p === currentPage ? "active" : ""}`}
            onClick={() => typeof p === "number" && setCurrentPage(p)}
            disabled={p === "..."}
          >
            {p}
          </button>
        ))}

        <button
          className="page-btn"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
