import "../styles/CurrentWeather.css";

import sunnyIcon from "../assets/images/icon-sunny.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconCloudy from "../assets/images/icon-overcast.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";

// get weather based on temrature
const getWeatherIcon = (code) => {
  switch (true) {
    case code === 0:
      return sunnyIcon; 
    case code === 1:
      return iconPartlyCloudy; 
    case code === 2 || code === 3:
      return iconCloudy; 
    case code === 45 || code === 48:
      return iconFog; 
    case code >= 51 && code <= 57:
      return iconRain; 
    case (code >= 61 && code <= 67) || (code >= 80 && code <= 82):
      return iconRain; 
    case (code >= 71 && code <= 77) || code === 85 || code === 86:
      return iconSnow; 
    case code >= 95 && code <= 99:
      return iconStorm; 
    default://defaul icon
      return sunnyIcon; 
  }
};

const CurrentWeather = ({ data }) => {
  if (!data || !data.current) return null;

  const { city, country, current } = data;
  const { temperature, weathercode } = current;

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
        <h2>{city}, {country}</h2>
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
