import type { WeatherResponse, ForecastResponse } from "../model/types";

interface WeatherCardProps {
  weather: WeatherResponse;
  forecast: ForecastResponse;
  displayName?: string;
}

export const WeatherCard = ({
  weather,
  forecast,
  displayName,
}: WeatherCardProps) => {
  return (
    <div className="w-full p-6 border-2 border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold"> {displayName || weather.name} </h2>

      <div className="my-4">
        <p className="text-4xl">{Math.round(weather.main.temp)}°C</p>
        <p className="text-sm text-gray-600">
          최저 {Math.round(weather.main.temp_min)}°C / 최고{" "}
          {Math.round(weather.main.temp_max)}°C
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">시간대별 기온</h3>
        <div className="space-y-1">
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
    </div>
  );
};
