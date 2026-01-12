import { useQuery } from "@tanstack/react-query";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
} from "../api/weatherApi";

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

export const useForecastByCity = (city: string) => {
  return useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchForecastByCity(city),
    enabled: !!city,
  });
};

export const useForecastByCoords = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ["forecast", "coords", lat, lon],
    queryFn: () => fetchForecastByCoords(lat!, lon!),
    enabled: lat !== null && lon !== null,
  });
};
