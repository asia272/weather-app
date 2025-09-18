import React from "react";
import "../styles/HourlyForecast.css";
import { getWeatherIcon } from "../utils/weatherIcons";

function HourlyForecast({ hourly, daily, selectedDay, setSelectedDay }) {
  if (!hourly || !daily) return null;

  // Show only hours of the chosen day
  const start = selectedDay * 24;
  const end = start + 24;

  return (
    <section className="hourly-forecast">
      <div className="hourly-forecast-top">
        <h3>Hourly Forecast</h3>
        {/* Dropdown Day Selector */}
        <div className="day-dropdown">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
          >
            {daily.time.map((date, idx) => (
              <option key={date} value={idx}>
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </option>
            ))}
          </select>
        </div>
      </div>


      {/* Hourly data for selected day */}
      <div className="hourly-list">
        {hourly.time.slice(start, end).map((time, idx) => {
          const code = hourly.weathercode[start + idx]; 
          const icon = getWeatherIcon(code);

          return (
            <div key={time} className="hour-card">
              <div className="hourly-icons">
                <img
                  src={icon}
                  alt={`Weather code ${code}`}
                  className="weather-icon"
                  style={{ width: "40px", height: "40px", margin: "0.5rem auto" }}
                />
         
                <p>
                  {new Date(time).toLocaleString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </p>
              </div>

              <p>{hourly.temperature_2m[start + idx]}°</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;
