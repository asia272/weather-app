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
    <section className="current-weather" data-aos="zoom-in">
      <header className="current-weather-content">
        <h2>
          {city}, {country}
        </h2>
        <time className="current-date" dateTime={now.toISOString()}>
          {formattedDate}
        </time>
      </header>

      <figure className="current-weather-icon">
        <img src={icon} alt="Weather Icon" />
        <figcaption className="current-temp">{displayTemp}°</figcaption>
      </figure>
    </section>
  );
};

export default CurrentWeather;
