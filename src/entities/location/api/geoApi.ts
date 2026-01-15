import { GEO_API_BASE_URL, WEATHER_API_KEY } from "@/shared/lib/constants";
import type { GeocodingResponse } from "../model/types";

export const fetchKoreanCityName = async (
  lat: number,
  lon: number
): Promise<string> => {
  const response = await fetch(
    `${GEO_API_BASE_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch location name");
  }

  const data: GeocodingResponse[] = await response.json();

  if (data && data.length > 0) {
    return data[0].local_names?.ko || data[0].name;
  }

  throw new Error("No location data found");
};
