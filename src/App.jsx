import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import ErrorMessage from "./components/ErrorMessage";
import { fetchCoordinates, fetchWeather } from "./api/openMeteo";

import "./App.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState("metric");
  const [selectedDay, setSelectedDay] = useState(0);

  const DEFAULT_CITY = "Berlin"; // ✅ define once

  const handleSearch = async (city) => {
    if (!city) return;

    setLoading(true);

    try {
      const location = await fetchCoordinates(city);
      if (!location) throw new Error("Location not found");

      const data = await fetchWeather(location.lat, location.lon, units);

      setWeather({
        city: location.name,
        country: location.country,
        current: data.current_weather,
        daily: data.daily,
        hourly: data.hourly,
      });
      setError(""); // ✅ clear error only on success
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeather(null); // clear only on failure
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    // ✅ retry should show default city again
    setError("");
    handleSearch(DEFAULT_CITY);
  };

  // ✅ run default search on first load + when units change
  useEffect(() => {
    handleSearch(DEFAULT_CITY);
  }, [units]);

  return (
    <div className="app-container">
      <section className="header">
        <Header units={units} setUnits={setUnits} />
      </section>

      {error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : (
        <>
          <section className="search-bar-section">
            <SearchBar onSearch={handleSearch} />
          </section>

          {weather && (
            <>
              <section className="current-weather">
                <CurrentWeather data={weather} />
              </section>

              <section className="weather-stats">
                <WeatherStats data={weather.current} />
              </section>

              <section className="daily-forecast">
                <DailyForecast
                  daily={weather.daily}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                />
              </section>

              <section className="hourly-forecast">
                <HourlyForecast
                  hourly={weather.hourly}
                  selectedDay={selectedDay}
                />
              </section>
            </>
          )}
        </>
      )}

      {loading && (
        <div className="loading-overlay">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
