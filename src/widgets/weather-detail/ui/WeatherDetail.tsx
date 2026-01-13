import {
  useWeatherByCoords,
  useForecastByCoords,
} from "@/entities/weather/model/queries";
import type { ForecastItem } from "@/entities/weather/model/types";

interface WeatherDetailProps {
  lat: string | null;
  lon: string | null;
  location: string | null;
}

export const WeatherDetail = ({ lat, lon, location }: WeatherDetailProps) => {
  const {
    data: weatherByCoords,
    isLoading: weatherCoordsLoading,
    error: weatherCoordsError,
  } = useWeatherByCoords(Number(lat), Number(lon));

  const {
    data: forecastByCoords,
    isLoading: forecastCoordsLoading,
    error: forecastCoordsError,
  } = useForecastByCoords(Number(lat), Number(lon));

  // 조건부 렌더링
  if (!lat || !lon) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">위치 정보가 없습니다.</p>
      </div>
    );
  }

  // 로딩 처리
  if (weatherCoordsLoading || forecastCoordsLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-xl">날씨 정보를 불러오는 중...</div>
      </div>
    );
  }

  // 에러 처리
  if (weatherCoordsError || forecastCoordsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">
          날씨 정보를 불러올 수 없습니다
        </h3>
        <p className="text-red-600">
          {weatherCoordsError?.message ||
            forecastCoordsError?.message ||
            "오류가 발생했습니다."}
        </p>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!weatherByCoords || !forecastByCoords) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">날씨 정보가 없습니다.</p>
      </div>
    );
  }

  const currentTemp = Math.round(weatherByCoords.main.temp);
  const todayForecasts = forecastByCoords.list.slice(0, 8);
  const todayTemps = todayForecasts.map((f: ForecastItem) => f.main.temp);
  const minTemp = Math.round(Math.min(...todayTemps));
  const maxTemp = Math.round(Math.max(...todayTemps));
  const hourlyForecasts = forecastByCoords.list.slice(0, 8);

  // location prop 사용, 없으면 API에서 받아온 이름 사용
  const locationName = location
    ? decodeURIComponent(location)
    : weatherByCoords.name;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{locationName}</h1>

      {/* 현재 날씨 요약 */}
      <section className="bg-blue-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">현재 기온</p>
            <p className="text-5xl font-bold">{currentTemp}°C</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">최저 / 최고</p>
            <p className="text-2xl font-semibold">
              {minTemp}°C / {maxTemp}°C
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <img
            src={`https://openweathermap.org/img/wn/${weatherByCoords.weather[0].icon}@2x.png`}
            alt={weatherByCoords.weather[0].description}
            className="w-16 h-16"
          />
          <p className="text-lg capitalize">
            {weatherByCoords.weather[0].description}
          </p>
        </div>
      </section>

      {/* 시간대별 예보 */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-3">시간대별 예보</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hourlyForecasts.map((forecast: ForecastItem) => {
            const time = new Date(forecast.dt * 1000);
            const temp = Math.round(forecast.main.temp);

            return (
              <div
                key={forecast.dt}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <p className="text-sm text-gray-600 mb-2">
                  {time.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                  className="w-12 h-12 mx-auto"
                />
                <p className="text-2xl font-bold text-center">{temp}°C</p>
                <p className="text-xs text-gray-500 text-center capitalize mt-1">
                  {forecast.weather[0].description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 상세 정보 섹션 */}
      <section>
        <h3 className="text-xl font-bold mb-3">상세 정보</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">체감 온도</p>
            <p className="text-2xl font-semibold">
              {Math.round(weatherByCoords.main.feels_like)}°C
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">습도</p>
            <p className="text-2xl font-semibold">
              {weatherByCoords.main.humidity}%
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">풍속</p>
            <p className="text-2xl font-semibold">
              {weatherByCoords.wind.speed} m/s
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">기압</p>
            <p className="text-2xl font-semibold">
              {weatherByCoords.main.pressure} hPa
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">구름</p>
            <p className="text-2xl font-semibold">
              {weatherByCoords.clouds.all}%
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">가시거리</p>
            <p className="text-2xl font-semibold">
              {(weatherByCoords.visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
