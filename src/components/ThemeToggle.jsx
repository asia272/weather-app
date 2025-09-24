import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext.jsx"; // ✅ import your context
import sunIcon from "../assets/images/sun.svg";   
import moonIcon from "../assets/light-theme-images/moon.svg";
import "../styles/ThemeToggle.css";

function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme} 
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <img src={sunIcon} alt="Switch to light theme" />
      ) : (
        <img src={moonIcon} alt="Switch to dark theme" />
      )}
    </button>
  );
}

export default ThemeToggle;
