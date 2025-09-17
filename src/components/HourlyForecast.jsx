import React from "react";
import "../styles/HourlyForecast.css";

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
                {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>




      {/* Hourly data for selected day */}
      <div className="hourly-list">
        {hourly.time.slice(start, end).map((time, idx) => (
          <div key={time} className="hour-card">
            <p>{new Date(time).getHours()}:00</p>
            <p>{hourly.temperature_2m[start + idx]}°</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HourlyForecast;
