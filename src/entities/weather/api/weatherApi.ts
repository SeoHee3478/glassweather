import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "@/shared/lib/constants";

// 현재 날씨(도시 이름)
export const fetchWeatherByCity = async (city: string) => {
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

// 현재 날씨(위도와 경도)
export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

// 시간대별 예보(도시 이름)
export const fetchForecastByCity = async (city: string) => {
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

// 시간대별 예보(위도와 경도)
export const fetchForecastByCoords = async (lat: number, lon: number) => {
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};
