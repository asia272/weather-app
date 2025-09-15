import React from "react";
import "../styles/SearchBar.css";

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Enter city..." />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;
