import React from "react";
import "../styles/WeatherStats.css";

function WeatherStats({ data }) {
  if (!data) return null;

  return (
    <section className="weather-stats">
      <div className="stat-card">
        <h4>Feels Like</h4>
        <p>{data.apparent_temperature ?? data.temperature}°</p>
      </div>
      <div className="stat-card">
        <h4>Humidity</h4>
        <p>{data.relativehumidity_2m ?? "-"}%</p>
      </div>
      <div className="stat-card">
        <h4>Wind Speed</h4>
        <p>{data.windspeed} {data.units?.windspeed || "km/h"}</p>
      </div>
      <div className="stat-card">
        <h4>Precipitation</h4>
        <p>{data.precipitation ?? 0} {data.units?.precipitation || "mm"}</p>
      </div>
    </section>
  );
}

export default WeatherStats;
