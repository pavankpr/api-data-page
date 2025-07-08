// TableHeader.jsx
import React from "react";

const columns = [
  { key: "postId", label: "Post ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" }
];

const TableHeader = ({ sortConfig, toggleSort }) => {
  const getIcon = (key) => {
    if (sortConfig.key !== key) return "";
    if (sortConfig.direction === "asc") return " ▲";
    if (sortConfig.direction === "desc") return " ▼";
    return "";
  };

  return (
    <tr>
      {columns.map((col) => (
        <th
          key={col.key}
          onClick={() => toggleSort(col.key)}
          style={{ cursor: "pointer" }}
        >
          {col.label}{getIcon(col.key)}
        </th>
      ))}
      <th>Comment</th>
    </tr>
  );
};

export default TableHeader;
