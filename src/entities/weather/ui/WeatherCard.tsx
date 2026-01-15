import { AddFavoriteButton } from "@/features/favorites/ui/AddFavoriteButton";
import { formatLocationName } from "@/shared/lib/locationUtils";
import type { WeatherResponse, ForecastResponse } from "../model/types";

interface WeatherCardProps {
  weather: WeatherResponse;
  forecast: ForecastResponse;
  displayName?: string;
  locationName?: string;
  showFavoriteButton?: boolean;
}

export const WeatherCard = ({
  weather,
  forecast,
  displayName,
  locationName,
  showFavoriteButton = true,
}: WeatherCardProps) => {
  return (
    <div className="p-6 border-2 border-gray-300 rounded-lg bg-white shadow-sm">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {displayName ? formatLocationName(displayName) : weather.name}
        </h2>

        {/* 헤더에 즐겨찾기 버튼 (아이콘만) */}
        {showFavoriteButton && locationName && (
          <AddFavoriteButton
            weather={weather}
            locationName={locationName}
            variant="icon" // 아이콘만 표시
          />
        )}
      </div>

      {/* 현재 날씨 */}
      <div className="mb-6">
        <div className="text-5xl font-bold mb-2">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="text-sm text-gray-500 mt-1">
          최저 {Math.round(weather.main.temp_min)}° / 최고{" "}
          {Math.round(weather.main.temp_max)}°
        </div>
      </div>

      {/* 시간대별 날씨 */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">시간대별 날씨</h3>
        <div className="flex gap-4 overflow-x-auto">
          {forecast.list.slice(0, 8).map((item) => (
            <div key={item.dt} className="flex-shrink-0 text-center">
              <div className="text-xs text-gray-600">
                {new Date(item.dt * 1000).getHours()}시
              </div>
              <div className="text-lg font-semibold">
                {Math.round(item.main.temp)}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
