import { useQuery } from "@tanstack/react-query";
import { fetchKoreanCityName } from "../api/geoApi";

export const useKoreanCityName = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ["location", "korean-name", lat, lon],
    queryFn: () => fetchKoreanCityName(lat!, lon!),
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
};
