import {
  useWeatherByCoords,
  useForecastByCoords,
} from "@/entities/weather/model/queries";
import { WeatherCard } from "@/entities/weather";
import { useGeolocation } from "@/shared/hooks/useGeolocation";

export const WeatherDashboard = () => {
  const {
    latitude,
    longitude,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation();

  // 현재 날씨
  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useWeatherByCoords(latitude, longitude);

  // 시간대별 예보
  const {
    data: forecastData,
    isLoading: forecastLoading,
    error: forecastError,
  } = useForecastByCoords(latitude, longitude);

  if (geoLoading || weatherLoading || forecastLoading) {
    return <div>날씨 정보를 가져오는 중...</div>;
  }

  if (geoError) {
    return <div>위치 권한이 필요합니다: {geoError}</div>;
  }

  if (weatherError || forecastError) {
    return <div>날씨 정보를 가져올 수 없습니다.</div>;
  }

  if (!weatherData || !forecastData) {
    return <div>날씨 정보가 없습니다.</div>;
  }

  return (
    <div>
      <WeatherCard weather={weatherData} forecast={forecastData} />
    </div>
  );
};
