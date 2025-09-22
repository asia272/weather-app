
import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import logo from "../assets/images/logo.svg";
import CheckIcon from "../assets/images/icon-checkmark.svg";
import unitIcon from "../assets/images/icon-units.svg";
import dropDownIcon from "../assets/images/icon-dropdown.svg";

function Header({ units, setUnits }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (category, value) => {
    setUnits((prev) => ({ ...prev, [category]: value }));
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo" data-aos="zoom-in">
        <img src={logo} alt="weather-app-logo" />
      </div>

      <div className="units-dropdown" data-aos="zoom-in" ref={dropdownRef}>
        <button className="units-btn" onClick={() => setOpen(!open)}>
          <img src={unitIcon} alt="units" className="unit-icon" />
          <span>Units</span>
          <img
            src={dropDownIcon}
            alt="dropdown"
            className={`dropdown-icon ${open ? "open" : ""}`}
          />
        </button>

        {open && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <h5>Switch to Imperial</h5>
              <p className="dropdown-label">Temperature</p>
              <button
                className={units.temperature === "C" ? "active" : ""}
                onClick={() => handleChange("temperature", "C")}
              >
                Celsius (°C)
                {units.temperature === "C" && (
                  <img src={CheckIcon} alt="selected" className="check-icon" />
                )}
              </button>
              <button
                className={units.temperature === "F" ? "active" : ""}
                onClick={() => handleChange("temperature", "F")}
              >
                Fahrenheit (°F)
                {units.temperature === "F" && (
                  <img src={CheckIcon} alt="selected" className="check-icon" />
                )}
              </button>
            </div>

            <div className="dropdown-section">
              <p className="dropdown-label">Wind Speed</p>
              <button
                className={units.windspeed === "km/h" ? "active" : ""}
                onClick={() => handleChange("windspeed", "km/h")}
              >
                km/h
                {units.windspeed === "km/h" && (
                  <img src={CheckIcon} alt="selected" className="check-icon" />
                )}
              </button>
              <button
                className={units.windspeed === "mph" ? "active" : ""}
                onClick={() => handleChange("windspeed", "mph")}
              >
                mph
                {units.windspeed === "mph" && (
                  <img src={CheckIcon} alt="selected" className="check-icon" />
                )}
              </button>
            </div>

            <div className="dropdown-section">
              <p className="dropdown-label">Precipitation</p>
              <button
                className={units.precipitation === "mm" ? "active" : ""}
                onClick={() => handleChange("precipitation", "mm")}
              >
                Millimeters (mm)
                {units.precipitation === "mm" && (
                  <img src={CheckIcon} alt="selected" className="check-icon" />
                )}
              </button>
              <button
                className={units.precipitation === "in" ? "active" : ""}
                onClick={() => handleChange("precipitation", "in")}
              >
                Inches (in)
                {units.precipitation === "in" && (
                  <img src={CheckIcon} alt="selected" className="check-icon" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

