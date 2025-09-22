import { useEffect } from "react";
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

import { useWeather } from "./hooks/useWeather";

import AOS from "aos";
import "aos/dist/aos.css";

import "./App.css";
import "./responsive/responsive.css";

export default function App() {
  const {
    weather,
    error,
    notFound,
    loading,
    searching,
    units,
    setUnits,
    selectedDay,
    setSelectedDay,
    handleSearch,
    handleRetry,
  } = useWeather("Berlin");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true, mirror: false });
  }, []);

  return (
    <div className="app-container">
      <section className="header-section">
        <Header units={units} setUnits={setUnits} />
      </section>

      {!error && (
        <section className="search-bar-section">
          <SearchBar onSearch={handleSearch} searching={searching} />
        </section>
      )}

      {error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : notFound ? (
        <NotFoundMessage onRetry={handleRetry} />
      ) : (
        <>
          {loading && !weather ? (
            <>
              <section className="current-weather-section"><HeroSkeleton /></section>
              <section className="weather-stats-section"><VarsSkeleton /></section>
              <section className="daily-forecast-section"><DailySkeleton /></section>
              <section className="hourly-forecast-section"><HourlySkeleton /></section>
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
