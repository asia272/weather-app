import React from "react";
import "../styles/Header.css";

function Header({ units, setUnits }) {
  return (
    <header className="header">
      <h1 className="app-title">Weather App</h1>

      <div className="units-toggle">
        <label htmlFor="units">Units:</label>
        <select
          id="units"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        >
          <option value="metric">Metric (°C, km/h, mm)</option>
          <option value="imperial">Imperial (°F, mph, in)</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
