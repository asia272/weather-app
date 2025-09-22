



import { useState, useEffect, useRef } from "react";
import SearchInProgress from "./SearchInProgress";
import SearchSuggestion from "./SearchSuggestion";
import "../styles/SearchBar.css";
import searchIcon from "../assets/images/icon-search.svg";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ onSearch, searching }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedCity = useDebounce(city, 500);
  const wrapperRef = useRef(null);

  // normalize helper
  const normalizeInput = (str) => str.replace(/\s+/g, " ").trim();

  // --- fetch suggestions ---
  useEffect(() => {
    const normalized = normalizeInput(debouncedCity);
    if (!normalized) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    async function fetchSuggestions() {
      try {
        const q = encodeURIComponent(normalized);
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=5&language=en&format=json`
        );
        if (!res.ok) {
          setSuggestions([]);
          return;
        }
        const data = await res.json();
        if (cancelled) return;

        const results = (data.results || []).map((r) => ({
          name: normalizeInput(r.name),
          country: r.country,
          admin1: r.admin1,
          display: `${normalizeInput(r.name)}${r.admin1 ? ", " + r.admin1 : ""}${
            r.country ? ", " + r.country : ""
          }`,
        }));

        setSuggestions(results);
        setActiveIndex(-1);
      } catch {
        if (!cancelled) setSuggestions([]);
      }
    }

    fetchSuggestions();
    return () => {
      cancelled = true;
    };
  }, [debouncedCity]);

  // --- click outside to close suggestions ---
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = normalizeInput(city);
    if (!normalized) return;
    onSearch(normalized);
    setCity("");
    setSuggestions([]);
    setActiveIndex(-1);
  };

  // handle select
  const handleSelect = (s) => {
    const normalized = normalizeInput(s.name);
    onSearch(normalized);
    setCity("");
    setSuggestions([]);
    setActiveIndex(-1);
  };

  // keyboard navigation
  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="search-bar" ref={wrapperRef}>
      <h1 data-aos="fade-down">How's the sky looking today?</h1>
      <form className="search-bar-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="inputs" style={{ position: "relative" }}>
          <div className="input-box">
            <img src={searchIcon} alt="search-icon" data-aos="fade-right" />
            <input
              type="text"
              placeholder="Search for a place..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
              data-aos="fade-right"
            />
          </div>

          {searching && <SearchInProgress />}

          <SearchSuggestion
            suggestions={suggestions}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        </div>

        <button type="submit" data-aos="fade-left">
          Search
        </button>
      </form>
    </div>
  );
}
