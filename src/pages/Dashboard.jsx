import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { saveState, loadState } from "../utils/persistState";

const PAGE_SIZE_OPTIONS = [10, 50, 100];

const Dashboard = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(loadState("search", ""));
  const [sortConfig, setSortConfig] = useState(loadState("sort", { key: null, direction: null }));
  const [pageSize, setPageSize] = useState(loadState("pageSize", 10));
  const [currentPage, setCurrentPage] = useState(loadState("page", 1));

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setFiltered(data); // Also initialize filtered
      })
      .catch((err) => {
        console.error("Error loading data", err);
      });
  }, []);

  useEffect(() => {
    let result = [...comments];

    if (search) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.body.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFiltered(result);
  }, [comments, search, sortConfig]);

  useEffect(() => {
    saveState("search", search);
    saveState("sort", sortConfig);
    saveState("pageSize", pageSize);
    saveState("page", currentPage);
  }, [search, sortConfig, pageSize, currentPage]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    else if (sortConfig.key === key && sortConfig.direction === "desc") key = null;
    setSortConfig({ key, direction: key ? direction : null });
  };

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const SortButton = ({ field, label }) => {
    const isActive = sortConfig.key === field;
    const icon = isActive ? (sortConfig.direction === "asc" ? "▲" : "▼") : "";
    return (
      <button className="btn-sort" onClick={() => handleSort(field)}>
        {label} {icon}
      </button>
    );
  };

  return (
    <div className="dashboard-container">

      <div className="header-row">
        <div className="sort-buttons">
          <SortButton field="postId" label="Sort Post ID" />
          <SortButton field="name" label="Sort Name" />
          <SortButton field="email" label="Sort Email" />
        </div>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {comments.length === 0 && filtered.length === 0 ? (
        <p>Loading data...</p>
      ) : paginated.length > 0 ? (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>Post ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id}>
                  <td>{item.postId}</td>
                  <td
                    className="clickable"
                    onClick={() => navigate(`/profile/${(item.id % 10) || 10}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.body}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-footer">
            <span>
              Showing {(currentPage - 1) * pageSize + 1} –{" "}
              {(currentPage - 1) * pageSize + paginated.length} of {filtered.length} items
            </span>
            <Pagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
            />
          </div>
        </>
      ) : (
        <p>No matching results.</p>
      )}
    </div>
  );
};

export default Dashboard;
