
import "../styles/CurrentWeather.css";
import { getWeatherIcon } from "../utils/weatherIcons";
import { convertTemperature } from "../utils/convertUnits"; 

const CurrentWeather = ({ data, units = {} }) => {
  if (!data || !data.current) return null;

  const { city, country, current } = data;
  const { temperature, weathercode } = current;

  // use convertUnits
  const displayTemp = convertTemperature(temperature, units.temperature || "C");
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
    <div className="current-weather"  data-aos="zoom-in">
      <div className="current-weather-content">
        <h2>{city}, {country}</h2>
        <p className="current-date">{formattedDate}</p>
      </div>

      <div className="current-weather-icon">
        <img src={icon} alt="Weather Icon" />
        <p className="current-temp">{displayTemp}°</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
