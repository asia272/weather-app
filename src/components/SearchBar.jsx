import { useState } from "react";
import "../styles/SearchBar.css"
export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <div className="search-bar">
      <h1  data-aos="fade-down">How's the sky looking today?</h1>
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a place..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
           data-aos="fade-right"
        />
        <button type="submit" data-aos="fade-left">Search</button>
      </form>
    </div>

  );
}
