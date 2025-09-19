// import React from "react";
// import "../styles/WeatherStats.css";

// function WeatherStats({ data }) {
//   if (!data) return null;

//   return (
//     <section className="weather-stats">
//       <div className="stat-card">
//         <h4>Feels Like</h4>
//         <p>{data.apparent_temperature ?? data.temperature}°</p>
//       </div>
//       <div className="stat-card">
//         <h4>Humidity</h4>
//         <p>{data.relativehumidity_2m ?? "-"}%</p>
//       </div>
//       <div className="stat-card">
//         <h4>Wind Speed</h4>
//         <p>{data.windspeed} {data.units?.windspeed || "km/h"}</p>
//       </div>
//       <div className="stat-card">
//         <h4>Precipitation</h4>
//         <p>{data.precipitation ?? 0} {data.units?.precipitation || "mm"}</p>
//       </div>
//     </section>
//   );
// }

// export default WeatherStats;


import React from "react";
import "../styles/WeatherStats.css";
import { convertTemperature, convertSpeed, convertPrecipitation } from "../utils/convertUnits";

function WeatherStats({ data, units = {} }) {
  if (!data) return null;

  return (
    <section className="weather-stats">
      <div className="stat-card">
        <h4>Feels Like</h4>
        <p>
          {convertTemperature(data.apparent_temperature ?? data.temperature, units.temperature || "C")}°
        </p>
      </div>

      <div className="stat-card">
        <h4>Humidity</h4>
        <p>{data.relativehumidity_2m ?? "-"}%</p>
      </div>

      <div className="stat-card">
        <h4>Wind Speed</h4>
        <p>
          {convertSpeed(data.windspeed, units.windspeed || "km/h")} {units.windspeed || "km/h"}
        </p>
      </div>

      <div className="stat-card">
        <h4>Precipitation</h4>
        <p>
          {convertPrecipitation(data.precipitation ?? 0, units.precipitation || "mm")}{" "}
          {units.precipitation || "mm"}
        </p>
      </div>
    </section>
  );
}

export default WeatherStats;
