import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity } from "../api/weatherApi";

export const useWeatherByCity = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: !!city,
  });
};
