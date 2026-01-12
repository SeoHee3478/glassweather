import { useState } from "react";
import {
  useWeatherByCity,
  useWeatherByCoords,
} from "@/entities/weather/model/queries";
import { WeatherCard } from "@/entities/weather";
import { useGeolocation } from "@/shared/hooks/useGeolocation";

export const WeatherDashboard = () => {
  const [city] = useState("seoul");
  const {
    latitude,
    longitude,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation();
  // const { data: weatherByCityData, isLoading: weatherByCityLoading, error:weatherByCityError } = useWeatherByCity(city);
  const {
    data: weatherByCoordsData,
    isLoading: weatherByCoordsLoading,
    error: weatherByCoordsError,
  } = useWeatherByCoords(latitude, longitude);

  if (geoLoading || weatherByCoordsLoading) {
    return <div>위치 정보를 가져오는 중...</div>;
  }

  if (geoError) {
    return <div>위치 권한이 필요합니다: {geoError}</div>;
  }

  if (weatherByCoordsError) {
    return <div>날씨 정보를 가져올 수 없습니다.</div>;
  }

  return (
    <div>
      {weatherByCoordsData && <WeatherCard weather={weatherByCoordsData} />}
    </div>
  );
};
