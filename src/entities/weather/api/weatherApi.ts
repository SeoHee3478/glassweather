import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "@/shared/lib/constants";

export const fetchWeatherByCity = async (city: string) => {
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
};
