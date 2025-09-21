
import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import ErrorMessage from "./components/ErrorMessage";
import NotFoundMessage from "./components/NotFoundMessage";

// Skeleton loaders (only for first render)
import HeroSkeleton from "./components/Loader/HeroSkeleton";
import VarsSkeleton from "./components/Loader/VarsSkeleton";
import DailySkeleton from "./components/Loader/DailySkeleton";
import HourlySkeleton from "./components/Loader/HourlySkeleton";

import { fetchCoordinates, fetchWeather } from "./api/openMeteo";
import { reverseGeocode } from "./api/reverseGeocode";

import AOS from "aos";
import "aos/dist/aos.css";

import "./App.css";
import "./responsive/responsive.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);

  const [loading, setLoading] = useState(true); //  for skeleton only first render
  const [searching, setSearching] = useState(false); // for later searches
  const [initialLoad, setInitialLoad] = useState(true); // flag for first render

  const [units, setUnits] = useState({
    temperature: "C",
    windspeed: "km/h",
    precipitation: "mm",
  });

  const [selectedDay, setSelectedDay] = useState(0);
  const [lastCity, setLastCity] = useState("Berlin");
  const DEFAULT_CITY = "Berlin";

  // Aos Animation setup
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  //  DRY helper function for loading weather by lat/lon

  const loadWeather = async (lat, lon, cityName, countryName = "") => {
    try {
      const data = await fetchWeather(lat, lon, "metric"); // still metric for now

      setWeather({
        city: cityName,
        country: countryName,
        current: data.current_weather,
        daily: data.daily,
        hourly: data.hourly,
      });

      setLastCity(cityName);
      setError("");
      setNotFound(false);
    } catch (err) {
      if (err.message.includes("Location not found")) {
        setNotFound(true);
      } else {
        setError("API error: Could not fetch weather data");
      }
      setWeather(null);
    } finally {
      setLoading(false);
      setSearching(false);
      setInitialLoad(false);
    }
  };

  // Handle manual search
  const handleSearch = async (city) => {
    if (!city) return;
    setLastCity(city);
    setError("");
    setNotFound(false);

    if (initialLoad) {
      setLoading(true); // first render  skeleton
    } else {
      setSearching(true); // later searches searching message
    }

    try {
      const location = await fetchCoordinates(city);
      if (!location) {
        setNotFound(true);
        setWeather(null);
      } else {
        await loadWeather(location.lat, location.lon, location.name, location.country);
        return; // exit here, avoid hitting finally twice
      }
    } catch (err) {
      if (err.message.includes("Location not found")) {
        setNotFound(true);
      } else {
        setError("API error: Could not fetch weather data");
      }
      setWeather(null);
    } finally {
      setLoading(false);
      setSearching(false);
      setInitialLoad(false);
    }
  };
  
//  Auto-detect location on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const location = await reverseGeocode(latitude, longitude);
            if (!location) {
              handleSearch(DEFAULT_CITY); // fallback
              return;
            }
            await loadWeather(latitude, longitude, location.name, location.country);
          } catch (err) {
            console.error("Location fetch failed:", err);
            handleSearch(DEFAULT_CITY);
          }
        },
        () => {
          // if denied or error → fallback
          handleSearch(DEFAULT_CITY);
        }
      );
    } else {
      handleSearch(DEFAULT_CITY);
    }
  }, []);
//Handle Retry
  const handleRetry = () => {
    setError("");
    setNotFound(false);
    handleSearch(lastCity || DEFAULT_CITY);
  };

  return (
    <div className="app-container">
      {/* Header always visible */}
      <section className="header-section">
        <Header units={units} setUnits={setUnits} />
      </section>

      {/* Search bar (only if no error) */}
      {!error && (
        <section className="search-bar-section">
          <SearchBar onSearch={handleSearch} searching={searching} />
        </section>
      )}

      {/* Error & Not Found */}
      {error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : notFound ? (
        <NotFoundMessage onRetry={handleRetry} />
      ) : (
        <>
          {/* Show skeletons ONLY on first render For Loading */}
          {loading && !weather ? (
            <>
              <section className="current-weather-section">
                <HeroSkeleton />
              </section>
              <section className="weather-stats-section">
                <VarsSkeleton />
              </section>
              <section className="daily-forecast-section">
                <DailySkeleton />
              </section>
              <section className="hourly-forecast-section">
                <HourlySkeleton />
              </section>
            </>
          ) : weather ? (
            <>
              <section className="current-weather-section">
                <CurrentWeather data={weather} units={units} />
              </section>

              <section className="weather-stats-section">
                <WeatherStats data={weather.current} units={units} />
              </section>

              <section className="daily-forecast-section">
                <DailyForecast daily={weather.daily} units={units} />
              </section>

              <section className="hourly-forecast-section">
                <HourlyForecast
                  hourly={weather.hourly}
                  daily={weather.daily}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  units={units}
                />
              </section>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

