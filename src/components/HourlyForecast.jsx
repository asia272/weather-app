import React from "react";
import "../styles/HourlyForecast.css";

function HourlyForecast({ hourly, selectedDay }) {
  if (!hourly) return null;

  // Show only hours of the chosen day
  const start = selectedDay * 24;
  const end = start + 24;

  return (
    <section className="hourly-forecast">
      <h2>Hourly Forecast</h2>
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
