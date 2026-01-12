import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../api/weatherApi";

export const useWeatherByCity = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: !!city,
  });
};

export const useWeatherByCoords = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ["weather", "coords", lat, lon],
    queryFn: () => fetchWeatherByCoords(lat!, lon!),
    enabled: lat !== null && lon !== null,
  });
};
