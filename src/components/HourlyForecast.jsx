
// import React from "react";
// import "../styles/HourlyForecast.css";
// import { getWeatherIcon } from "../utils/weatherIcons";
// import { convertTemperature } from "../utils/convertUnits"; // ✅ add

// function HourlyForecast({ hourly, daily, selectedDay, setSelectedDay, units = {} }) {
//   if (!hourly || !daily) return null;

//   // Show only hours of the chosen day
//   const start = selectedDay * 24;
//   const end = start + 24;

//   return (
//     <section className="hourly-forecast">
//       <div className="hourly-forecast-top">
//         <h3>Hourly Forecast</h3>
//         <div className="day-dropdown">
//           <select value={selectedDay} onChange={(e) => setSelectedDay(Number(e.target.value))}>
//             {daily.time.map((date, idx) => (
//               <option key={date} value={idx}>
//                 {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="hourly-list">
//         {hourly.time.slice(start, end).map((time, idx) => {
//           const code = hourly.weathercode[start + idx];
//           const icon = getWeatherIcon(code);

//           const temp = convertTemperature(hourly.temperature_2m[start + idx], units.temperature || "C");

//           return (
//             <div key={time} className="hour-card">
//               <div className="hourly-icons">
//                 <img
//                   src={icon}
//                   alt={`Weather code ${code}`}
//                   className="weather-icon"
//                   style={{ width: "40px", height: "40px", margin: "0.5rem auto" }}
//                 />
//                 <p>{new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: true })}</p>
//               </div>
//               <p>{temp}°</p>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default HourlyForecast;



import React, { useState } from "react";
import "../styles/HourlyForecast.css";
import { getWeatherIcon } from "../utils/weatherIcons";
import { convertTemperature } from "../utils/convertUnits";
import dropDownIcon from "../assets/images/icon-dropdown.svg"; // ✅ custom arrow

function HourlyForecast({ hourly, daily, selectedDay, setSelectedDay, units = {} }) {
  if (!hourly || !daily) return null;

  const [open, setOpen] = useState(false);

  // Show only hours of the chosen day
  const start = selectedDay * 24;
  const end = start + 24;

  return (
    <section className="hourly-forecast">
      <div className="hourly-forecast-top">
        <h3>Hourly Forecast</h3>

        {/* ✅ Custom dropdown */}
        <div className="day-dropdown">
          <button className="day-btn" onClick={() => setOpen(!open)}>
            {new Date(daily.time[selectedDay]).toLocaleDateString("en-US", { weekday: "long" })}
            <img
              src={dropDownIcon}
              alt="toggle dropdown"
              className={`dropdown-icon ${open ? "open" : ""}`}
            />
          </button>

          {open && (
            <div className="day-menu">
              {daily.time.map((date, idx) => (
                <button
                  key={date}
                  className={`day-option ${selectedDay === idx ? "active" : ""}`}
                  onClick={() => {
                    setSelectedDay(idx);
                    setOpen(false);
                  }}
                >
                  {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hourly cards */}
      <div className="hourly-list">
        {hourly.time.slice(start, end).map((time, idx) => {
          const code = hourly.weathercode[start + idx];
          const icon = getWeatherIcon(code);

          const temp = convertTemperature(
            hourly.temperature_2m[start + idx],
            units.temperature || "C"
          );

          return (
            <div key={time} className="hour-card">
              <div className="hourly-icons">
                <img
                  src={icon}
                  alt={`Weather code ${code}`}
                  className="weather-icon"
                  style={{ width: "40px", height: "40px", margin: "0.5rem auto" }}
                />
                <p>{new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: true })}</p>
              </div>
              <p>{temp}°</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HourlyForecast;
