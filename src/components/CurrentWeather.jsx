import "../styles/CurrentWeather.css";
import { getWeatherIcon } from "../utils/weatherIcons"; // ✅ correct import

const CurrentWeather = ({ data }) => {
  if (!data || !data.current) return null;

  const { city, country, current } = data;
  const { temperature, weathercode } = current;

  // ✅ use the function
  const icon = getWeatherIcon(weathercode);

  // current date
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="current-weather">
      <div className="current-weather-content">
        <h2>
          {city}, {country}
        </h2>
        <p className="current-date">{formattedDate}</p>
      </div>

      <div className="current-weather-icon">
        <img src={icon} alt="Weather Icon" />
        <p className="current-temp">{temperature}°</p>
      </div>
    </div>
  );
};

export default CurrentWeather;

