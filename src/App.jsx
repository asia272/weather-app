
import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import ErrorMessage from "./components/ErrorMessage";
import NotFoundMessage from "./components/NotFoundMessage";


// Skeleton loaders
import HeroSkeleton from "./components/Loader/HeroSkeleton";
import VarsSkeleton from "./components/Loader/VarsSkeleton";
import DailySkeleton from "./components/Loader/DailySkeleton";
import HourlySkeleton from "./components/Loader/HourlySkeleton";

import { fetchCoordinates, fetchWeather } from "./api/openMeteo";



import AOS from "aos";
import "aos/dist/aos.css";


import "./App.css";
import "./responsive/responsive.css"

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  //Aos Animation setup
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const [units, setUnits] = useState({
    temperature: "C",
    windspeed: "km/h",
    precipitation: "mm"
  });

  const [selectedDay, setSelectedDay] = useState(0);
  const [lastCity, setLastCity] = useState("Berlin");
  const DEFAULT_CITY = "Berlin";



  const handleSearch = async (city) => {
    if (!city) return;
    setLastCity(city);
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

      // Always fetch in metric → convert later
      const data = await fetchWeather(location.lat, location.lon, "metric");

      setWeather({
        city: location.name,
        country: location.country,
        current: data.current_weather,
        daily: data.daily,
        hourly: data.hourly,
      });
    } catch (err) {
      if (err.message.includes("Location not found")) {
        setNotFound(true);
      } else {
        setError("API error: Could not fetch weather data");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError("");
    setNotFound(false);
    handleSearch(lastCity || DEFAULT_CITY);
  };

  useEffect(() => {
    handleSearch(lastCity || DEFAULT_CITY);
  }, []);

  return (

  <div className="app-container">
  {/* Header always visible */}
  <section className="header-section">
    <Header units={units} setUnits={setUnits} />
  </section>

  {/* Conditionally render SearchBar: only if no error */}
  {!error && (
    <section className="search-bar-section">
      <SearchBar onSearch={handleSearch} />
    </section>
  )}

  {/* Error & Not Found */}
  {error ? (
    <ErrorMessage message={error} onRetry={handleRetry} />
  ) : notFound ? (
    <NotFoundMessage onRetry={handleRetry} />
  ) : (
    <>
      {/* Current Weather */}
      <section className="current-weather-section" data-aos="zoom-in">
        {loading ? <HeroSkeleton /> : <CurrentWeather data={weather} units={units} />}
      </section>

      {/* Weather Stats */}
      <section className="weather-stats-section">
        {loading ? <VarsSkeleton /> : <WeatherStats data={weather.current} units={units} />}
      </section>

      {/* Daily Forecast */}
      <section
        className="daily-forecast-section"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {loading ? <DailySkeleton /> : <DailyForecast daily={weather.daily} units={units} />}
      </section>

      {/* Hourly Forecast */}
      <section
        className="hourly-forecast-section"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        {loading ? (
          <HourlySkeleton />
        ) : (
          <HourlyForecast
            hourly={weather.hourly}
            daily={weather.daily}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            units={units}
          />
        )}
      </section>
    </>
  )}
</div>



  );
}
