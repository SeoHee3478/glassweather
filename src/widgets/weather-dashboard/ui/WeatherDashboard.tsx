import { useState } from "react";
import { useWeatherByCity } from "@/entities/weather/model/queries";
import { WeatherCard } from "@/entities/weather";

export const WeatherDashboard = () => {
  const [city] = useState("seoul");
  const { data, isLoading, error } = useWeatherByCity(city);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <WeatherCard weather={data} />}
    </div>
  );
};
