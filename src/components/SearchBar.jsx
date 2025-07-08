import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search name, email, comment"
      className="form-control"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
