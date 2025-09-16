import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import ErrorMessage from "./components/ErrorMessage";
import NotFoundMessage from "./components/NotFoundMessage";
import { fetchCoordinates, fetchWeather } from "./api/openMeteo";

import "./App.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState("metric");
  const [selectedDay, setSelectedDay] = useState(0);
  const [lastCity, setLastCity] = useState("Berlin"); // remember last search

  const DEFAULT_CITY = "Berlin";

  const handleSearch = async (city) => {
    if (!city) return;

    setLastCity(city); // store the latest searched city
    setLoading(true);
    setError("");
    setNotFound(false);

    try {
      const location = await fetchCoordinates(city);
      if (!location) {
        setNotFound(true);
        setWeather(null);
        return;
      }

      const data = await fetchWeather(location.lat, location.lon, units);

      setWeather({
        city: location.name,
        country: location.country,
        current: data.current_weather,
        daily: data.daily,
        hourly: data.hourly,
      });
    } catch (err) {
      if (err.message.includes("Location not found")) {
        setNotFound(true); // handle city not found separately
      } else {
        setError("API error: Could not fetch weather data"); // only true API errors
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    setNotFound(false);
    handleSearch(lastCity || DEFAULT_CITY); // retry with last city searched
  };

  // Run default search on first load + whenever units change
  useEffect(() => {
    handleSearch(lastCity || DEFAULT_CITY);
  }, [units]);

  return (
    <div className="app-container">
      <section className="header-section">
        <Header units={units} setUnits={setUnits} />
      </section>

      {error ? (
        // API error: only show error message
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : notFound ? (
        // City not found: show search bar + not found message
        <>
          <section className="search-bar-section">
            <SearchBar onSearch={handleSearch} />
          </section>
          <NotFoundMessage onRetry={handleRetry} />
        </>
      ) : (
        // Normal weather data
        <>
          <section className="search-bar-section">
            <SearchBar onSearch={handleSearch} />
          </section>

          {weather && (
            <>
              <section className="current-weather-section">
                <CurrentWeather data={weather} />
              </section>

              <section className="weather-stats-section">
                <WeatherStats data={weather.current} />
              </section>

              <section className="daily-forecast-section">
                <DailyForecast
                  daily={weather.daily}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                />
              </section>

              <section className="hourly-forecast-section">
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
