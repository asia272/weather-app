
import "../styles/SearchSuggestion.css";

export default function SearchSuggestion({ suggestions, activeIndex, onSelect }) {
  if (suggestions.length === 0) return null;

  return (
    <div className="suggestions-dropdown">
      <ul>
        {suggestions.map((s, i) => (
          <li
            key={`${s.name}-${i}`}
            className={i === activeIndex ? "active" : ""}
            onClick={() => onSelect(s)}
          >
            {s.display}
          </li>
        ))}
      </ul>
    </div>
  );
}
