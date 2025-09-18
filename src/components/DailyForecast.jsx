import React from "react";
import "../styles/DailyForecast.css";
import { getWeatherIcon } from "../utils/weatherIcons"; // use function instead of map

function DailyForecast({ daily }) {
  if (!daily) return null;

  return (
    <section className="daily-forecast">
      <h3>Daily Forecast</h3>

      <div className="forecast-list">
        {daily.time.map((date, idx) => {
          const code = daily.weathercode[idx]; 
          const icon = getWeatherIcon(code);   

          return (
            <div key={date} className="forecast-card">
              <p>
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img
                src={icon}
                alt={`Weather code ${code}`}   
                className="weather-icon"
                style={{ width: "40px", height: "40px", margin: "0.5rem auto" }}
              />
              <p>
                {daily.temperature_2m_max[idx]}° / {daily.temperature_2m_min[idx]}°
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DailyForecast;
