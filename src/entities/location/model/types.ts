export interface GeocodingResponse {
  name: string;
  local_names?: {
    ko?: string;
    en?: string;
  };
  lat: number;
  lon: number;
  country: string;
}
