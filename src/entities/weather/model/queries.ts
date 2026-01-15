import { useQuery } from "@tanstack/react-query";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCity,
  fetchForecastByCoords,
} from "../api/weatherApi";

const CACHE_CONFIG = {
  staleTime: 10 * 60 * 1000, // 10분
  gcTime: 30 * 60 * 1000, // 30분
} as const;

export const useWeatherByCity = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: !!city,
    staleTime: CACHE_CONFIG.staleTime,
    gcTime: CACHE_CONFIG.gcTime,
    refetchOnWindowFocus: false,
  });
};

export const useWeatherByCoords = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ["weather", "coords", lat, lon],
    queryFn: () => fetchWeatherByCoords(lat!, lon!),
    enabled: lat !== null && lon !== null,
    staleTime: CACHE_CONFIG.staleTime,
    gcTime: CACHE_CONFIG.gcTime,
    refetchOnWindowFocus: false,
  });
};

export const useForecastByCity = (city: string) => {
  return useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchForecastByCity(city),
    enabled: !!city,
    staleTime: CACHE_CONFIG.staleTime,
    gcTime: CACHE_CONFIG.gcTime,
    refetchOnWindowFocus: false,
  });
};

export const useForecastByCoords = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ["forecast", "coords", lat, lon],
    queryFn: () => fetchForecastByCoords(lat!, lon!),
    enabled: lat !== null && lon !== null,
    staleTime: CACHE_CONFIG.staleTime,
    gcTime: CACHE_CONFIG.gcTime,
    refetchOnWindowFocus: false,
  });
};
