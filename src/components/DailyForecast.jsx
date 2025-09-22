
import React from "react";
import "../styles/DailyForecast.css";
import { getWeatherIcon } from "../utils/weatherIcons";
import { convertTemperature } from "../utils/convertUnits";

function DailyForecast({ daily, units = {} }) {
  if (!daily) return null;

  return (
    <section className="daily-forecast">
      <h3>Daily Forecast</h3>

      <div className="forecast-list">
        {daily.time.map((date, idx) => {
          const code = daily.weathercode[idx];
          const icon = getWeatherIcon(code);

          const maxTemp = convertTemperature(daily.temperature_2m_max[idx], units.temperature || "C");
          const minTemp = convertTemperature(daily.temperature_2m_min[idx], units.temperature || "C");

          return (
            <div key={date} className="forecast-card">
              <p >{new Date(date).toLocaleDateString("en-US", { weekday: "short" })}</p>
              <img
                src={icon}
                alt={`Weather code ${code}`}
                className="weather-icon"
                style={{ width: "40px", height: "40px", margin: "0.5rem auto" }}
       
              />
              <div className="daily-temp">
                <p>{maxTemp}°</p>
                <p>{minTemp}°</p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DailyForecast;
