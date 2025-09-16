import React from "react";
import "../styles/Header.css";
import logo from "../assets/images/logo.svg"

function Header({ units, setUnits }) {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="weather-app-logo" />
      </div>


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
