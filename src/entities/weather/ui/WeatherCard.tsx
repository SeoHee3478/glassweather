import type { WeatherResponse, ForecastResponse } from "../model/types";

interface WeatherCardProps {
  weather: WeatherResponse;
  forecast: ForecastResponse;
}

export const WeatherCard = ({ weather, forecast }: WeatherCardProps) => {
  return (
    <div>
      <h2>{weather.name}</h2>
      <div>
        <p>현재기온: {weather.main.temp}°C</p>
        <p>당일의 최저 기온: {weather.main.temp_min}°C</p>
        <p>당일의 최고 기온: {weather.main.temp_max}°C</p>
      </div>
      <div>
        {forecast.list.slice(0, 8).map((item) => (
          <div key={item.dt} className="flex justify-between">
            <span>
              {new Date(item.dt_txt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>{Math.round(item.main.temp)}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
};
