
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

import AOS from "aos";
import "aos/dist/aos.css";


import "./App.css";
import "./responsive/responsive.css"

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);


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
      <section className="header-section">
        <Header units={units} setUnits={setUnits} /> 
        {/*  pass down units and updater */}
      </section>

      {error ? (
        <ErrorMessage message={error} onRetry={handleRetry} />
      ) : notFound ? (
        <>
          <section className="search-bar-section">
            <SearchBar onSearch={handleSearch} />
          </section>
          <NotFoundMessage onRetry={handleRetry} />
        </>
      ) : (
        <>
          <section className="search-bar-section" >
            <SearchBar onSearch={handleSearch} />
          </section>

          {weather && (
            <>
              <section className="current-weather-section" data-aos="zoom-in">
                <CurrentWeather data={weather} units={units} />
              </section>

              <section className="weather-stats-section" >
                <WeatherStats data={weather.current} units={units} />
              </section>

              <section className="daily-forecast-section" data-aos="fade-up" data-aos-delay="200">
                <DailyForecast daily={weather.daily} units={units} />
              </section>

              <section className="hourly-forecast-section" data-aos="fade-left" data-aos-delay="300">
                <HourlyForecast
                  hourly={weather.hourly}
                  daily={weather.daily}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  units={units}
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
