// import React from "react";
// import "../../styles/LoadingUI.css";

// export default function DailySkeleton() {
//   return (
//     <section className="daily-skeleton">
//       <h3>Daily forecast</h3>
//       <div className="daily-grid">
//         {Array.from({ length: 7 }).map((_, i) => (
//           <div className="daily-card" key={i}></div>
//         ))}
//       </div>
//     </section>
//   );
// }
import React from "react";
import "../../styles/LoadingUI.css";

export default function DailySkeleton() {
  return (
    <section className="daily-forecast">  {/* same wrapper class */}
      <h3>Daily Forecast</h3>

      <div className="forecast-list">  {/* same list class */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div className="forecast-card forecast-card-skeleton" key={i}>
            {/* Placeholder for day */}
            <div className="day-skel"></div>

            {/* Placeholder for icon */}
            <div className="icon-skel"></div>

            {/* Placeholder for temperatures */}
            <div className="daily-temp">
              <div className="temp-skel"></div>
              <div className="temp-skel"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
