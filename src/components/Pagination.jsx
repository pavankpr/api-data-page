import React from "react";

const Pagination = ({ pageSize, setPageSize, currentPage, setCurrentPage, totalPages, pageSizeOptions }) => {
  const pages = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <div className="pagination-container">
      <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
        {pageSizeOptions.map(size => (
          <option key={size} value={size}>{size} / Page</option>
        ))}
      </select>
      <div className="page-buttons">
        {pages.map((p) => (
          <button
            key={p}
            className={`page-btn ${p === currentPage ? "active" : ""}`}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
