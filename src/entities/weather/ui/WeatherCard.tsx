import { convertCelsius } from "@/shared/lib/utils/temperature";
import type { WeatherResponse } from "../model/types";

interface WeatherCardProps {
  weather: WeatherResponse;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div>
      <h2>{weather.name}</h2>
      <p>현재기온: {convertCelsius(weather.main.temp)}°C</p>
      <p>당일의 최저 기온: {convertCelsius(weather.main.temp_min)}°C</p>
      <p>당일의 최고 기온: {convertCelsius(weather.main.temp_max)}°C</p>
      <p>시간대 별 기온: °C</p>
    </div>
  );
};
