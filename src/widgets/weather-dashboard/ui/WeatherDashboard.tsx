import {
  useWeatherByCoords,
  useForecastByCoords,
  useWeatherByCity,
  useForecastByCity,
} from "@/entities/weather/model/queries";
import { WeatherCard } from "@/entities/weather";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import { convertToEnglishCity } from "@/shared/lib/cityNameMapper";
import { LocationSearch } from "@/features/location-search/ui/LocationSearch";
import { useEffect, useState } from "react";
import { getCityCoordinates } from "@/shared/lib/locationUtils";

export const WeatherDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [useCoords, setUseCoords] = useState(false);

  const {
    latitude: userLat,
    longitude: userLon,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation();

  // 검색 위치의 좌표 또는 사용자 위치
  const targetCoords =
    selectedLocation && useCoords
      ? getCityCoordinates(selectedLocation)
      : { lat: userLat, lon: userLon };

  // 좌표 기반 조회 (targetCoords 사용)
  const {
    data: weatherByCoords,
    isLoading: weatherCoordsLoading,
    error: weatherCoordsError,
  } = useWeatherByCoords(targetCoords?.lat, targetCoords?.lon);

  const {
    data: forecastByCoords,
    isLoading: forecastCoordsLoading,
    error: forecastCoordsError,
  } = useForecastByCoords(targetCoords?.lat, targetCoords?.lon);

  // 도시명 기반 (변경 없음)
  const searchCity =
    selectedLocation && !useCoords
      ? convertToEnglishCity(selectedLocation)
      : "";

  const {
    data: weatherByCity,
    isLoading: weatherCityLoading,
    error: weatherCityError,
  } = useWeatherByCity(searchCity);

  const {
    data: forecastByCity,
    isLoading: forecastCityLoading,
    error: forecastCityError,
  } = useForecastByCity(searchCity);

  const canUseCoordsAsBackup = selectedLocation
    ? !!getCityCoordinates(selectedLocation)
    : false;

  // 도시명 실패 시 좌표로 전환
  useEffect(() => {
    if (
      selectedLocation &&
      (weatherCityError || forecastCityError) &&
      !useCoords
    ) {
      const cityCoords = getCityCoordinates(selectedLocation);
      if (cityCoords) {
        queueMicrotask(() => {
          setUseCoords(true);
        });
      }
    }
  }, [weatherCityError, forecastCityError, selectedLocation, useCoords]);

  const currentWeather = selectedLocation
    ? useCoords
      ? weatherByCoords
      : weatherByCity
    : weatherByCoords;

  const currentForecast = selectedLocation
    ? useCoords
      ? forecastByCoords
      : forecastByCity
    : forecastByCoords;

  const isLoading = selectedLocation
    ? useCoords
      ? weatherCoordsLoading || forecastCoordsLoading
      : weatherCityLoading || forecastCityLoading
    : geoLoading || weatherCoordsLoading || forecastCoordsLoading;

  const hasError = selectedLocation
    ? useCoords
      ? weatherCoordsError || forecastCoordsError // 좌표 모드 에러
      : (weatherCityError || forecastCityError) && !canUseCoordsAsBackup // 도시명 에러 + 좌표 없음
    : weatherCoordsError || forecastCoordsError;

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setUseCoords(false);
  };

  return (
    <div>
      <LocationSearch onSelectLocation={handleLocationSelect} />

      {geoError && !selectedLocation && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
          위치 권한이 거부되어 서울의 날씨를 표시합니다.
        </div>
      )}

      {isLoading && (
        <div className="p-6 border-2 border-gray-300 rounded-lg bg-gray-50">
          <p className="text-gray-600">날씨 정보를 가져오는 중...</p>
        </div>
      )}

      {!isLoading && hasError && (
        <div className="p-6 border-2 border-amber-300 bg-amber-50 rounded-lg">
          <p className="text-amber-800 font-semibold">
            해당 장소의 정보가 제공되지 않습니다.
          </p>
          <p className="text-sm text-amber-600 mt-2">
            다른 지역을 검색해보세요. 서울, 부산, 대구 등 주요 도시를 검색할 수
            있습니다.
          </p>
        </div>
      )}

      {!isLoading && !hasError && currentWeather && currentForecast && (
        <WeatherCard
          weather={currentWeather}
          forecast={currentForecast}
          displayName={selectedLocation?.split("-").pop()}
        />
      )}
    </div>
  );
};
