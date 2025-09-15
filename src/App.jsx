import React, { useState } from "react";

// Import components
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import ErrorMessage from "./components/ErrorMessage";

import "./App.css"

function App() {
  const [error, setError] = useState(true);

  // Retry handler (you can trigger a re-fetch here)
  const handleRetry = () => {
    setError(false);
    // re-fetch weather API here
  };

  return (
    <div className="app-container">
      <section className="header">
        <Header />
      </section>

      {error ? (
        <ErrorMessage message="We couldn’t connect to the server (API error). Please try again in a few moments." onRetry={handleRetry} />
      ) : (
        <>
          <section className="Search-bar">
            <SearchBar />
          </section>
          <section className="curent-weather">
            <CurrentWeather setError={setError} />
          </section>
          <section className="weather-stats">
            <WeatherStats />
          </section>
          <section className="daily-forcast">
            <DailyForecast />
          </section>
          <section className="hourly-forcast">
            <HourlyForecast />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
