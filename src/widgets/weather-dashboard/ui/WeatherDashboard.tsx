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
import { useState, useMemo } from "react";
import { getCityCoordinates } from "@/shared/lib/locationUtils";
import { FavoritesList } from "@/features/favorites/ui/FavoritesList";
import { useKoreanCityName } from "@/entities/location/model/queries";

export const WeatherDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const {
    latitude: userLat,
    longitude: userLon,
    error: geoError,
    loading: geoLoading,
  } = useGeolocation();

  // 선택된 위치가 있으면 도시명으로 먼저 조회 시도
  const searchCity = selectedLocation
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

  // 도시명 조회가 실패했고, 좌표가 있으면 좌표로 조회
  const shouldUseCoords = useMemo(() => {
    if (!selectedLocation) return true; // 선택 안했으면 사용자 위치 사용

    const hasError = weatherCityError || forecastCityError;
    const canUseCoords = !!getCityCoordinates(selectedLocation);

    return hasError && canUseCoords;
  }, [selectedLocation, weatherCityError, forecastCityError]);

  // 좌표 결정: 선택된 위치의 좌표 또는 사용자 위치
  const targetCoords = useMemo(() => {
    if (!selectedLocation || !shouldUseCoords) {
      return { lat: userLat, lon: userLon };
    }
    return (
      getCityCoordinates(selectedLocation) || { lat: userLat, lon: userLon }
    );
  }, [selectedLocation, shouldUseCoords, userLat, userLon]);

  // 좌표 기반 조회
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

  // 한글 지명 조회(좌표가 있을 때만)
  const { data: koreanCityName, isLoading: isLoadingKoreanName } =
    useKoreanCityName(
      targetCoords?.lat ?? undefined,
      targetCoords?.lon ?? undefined
    );

  // 현재 사용할 날씨 데이터 결정
  const currentWeather = useMemo(() => {
    if (!selectedLocation) return weatherByCoords;
    return shouldUseCoords ? weatherByCoords : weatherByCity;
  }, [selectedLocation, shouldUseCoords, weatherByCoords, weatherByCity]);

  const currentForecast = useMemo(() => {
    if (!selectedLocation) return forecastByCoords;
    return shouldUseCoords ? forecastByCoords : forecastByCity;
  }, [selectedLocation, shouldUseCoords, forecastByCoords, forecastByCity]);

  // 로딩 상태
  const isLoading = useMemo(() => {
    if (!selectedLocation) {
      return geoLoading || weatherCoordsLoading || forecastCoordsLoading;
    }
    return shouldUseCoords
      ? weatherCoordsLoading || forecastCoordsLoading
      : weatherCityLoading || forecastCityLoading;
  }, [
    selectedLocation,
    shouldUseCoords,
    geoLoading,
    weatherCoordsLoading,
    forecastCoordsLoading,
    weatherCityLoading,
    forecastCityLoading,
  ]);

  // 에러 상태
  const hasError = useMemo(() => {
    if (!selectedLocation) {
      return !!(weatherCoordsError || forecastCoordsError);
    }

    const canUseCoordsAsBackup = !!getCityCoordinates(selectedLocation);

    if (shouldUseCoords) {
      return !!(weatherCoordsError || forecastCoordsError);
    }

    // 도시명 조회 중이고, 에러가 있지만 좌표 백업이 없는 경우
    return !!(weatherCityError || forecastCityError) && !canUseCoordsAsBackup;
  }, [
    selectedLocation,
    shouldUseCoords,
    weatherCoordsError,
    forecastCoordsError,
    weatherCityError,
    forecastCityError,
  ]);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const displayLocationName = useMemo(() => {
    if (selectedLocation) return selectedLocation;
    if (!isLoadingKoreanName && koreanCityName) return koreanCityName;
    return currentWeather?.name || "현재 위치";
  }, [selectedLocation, isLoadingKoreanName, koreanCityName, currentWeather]);

  return (
    <div className="space-y-6">
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
          displayName={selectedLocation || undefined}
          locationName={displayLocationName}
          showFavoriteButton={true}
        />
      )}

      <FavoritesList />
    </div>
  );
};
