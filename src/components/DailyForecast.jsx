// import React from "react";
// import "../styles/DailyForecast.css";

// function DailyForecast({ daily, selectedDay, setSelectedDay }) {
//   if (!daily) return null;

//   return (
//     <section className="daily-forecast">
//       <h2>7-Day Forecast</h2>
//       <div className="forecast-list">
//         {daily.time.map((date, idx) => (
//           <button
//             key={date}
//             className={`forecast-card ${selectedDay === idx ? "active" : ""}`}
//             onClick={() => setSelectedDay(idx)}
//           >
//             <p>{new Date(date).toLocaleDateString("en-US", { weekday: "short" })}</p>
//             <p>{daily.temperature_2m_max[idx]}° / {daily.temperature_2m_min[idx]}°</p>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default DailyForecast;
import React from "react";
import "../styles/DailyForecast.css";

function DailyForecast({ daily }) {
  if (!daily) return null;

  return (
    <section className="daily-forecast">
      <h3>Daily Forecast</h3>
  
      <div className="forecast-list">
        {daily.time.map((date, idx) => (
          <div key={date} className="forecast-card">
            <p>
              {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <p>
              {daily.temperature_2m_max[idx]}° / {daily.temperature_2m_min[idx]}°
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DailyForecast;
