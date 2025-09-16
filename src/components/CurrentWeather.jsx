const CurrentWeather = ({ data }) => {
  if (!data || !data.current) return null;

  const { city, country, current } = data;
  const { temperature, weathercode } = current;

  return (
    <div className="current-weather">
      <h2>{city}, {country}</h2>
      <p>{temperature}°</p>
      <img src={`/icons/${weathercode}.png`} alt="Weather Icon" />
    </div>
  );
};

export default CurrentWeather;
