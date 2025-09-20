import { useState } from "react";

import SearchInProgress from "./SearchInProgress";
import "../styles/SearchBar.css"



export default function SearchBar({ onSearch, searching }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <div className="search-bar">
      <h1 data-aos="fade-down">How's the sky looking today?</h1>
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Search for a place..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            data-aos="fade-right"
          />
          {searching && (
            <SearchInProgress />
          )}
        </div>

        <button type="submit" data-aos="fade-left">Search</button>
      </form>
    </div>

  );
}

